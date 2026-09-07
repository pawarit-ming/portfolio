"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localeAbbreviations,
  localeNames,
  locales,
  withLocale,
  type Locale,
} from "@/lib/i18n";

/**
 * Writing the preference down for next time. Kept at module scope rather than
 * as a closure inside the component: assigning to `document.cookie` from a
 * component body trips the React Compiler's immutability rule, which cannot
 * tell a browser global apart from a value captured across a render.
 *
 * `document.cookie` rather than a server action because nothing has to happen
 * before the navigation — the proxy reads this on some later visit, when the
 * visitor arrives at a URL with no language in it.
 */
function rememberLocale(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/**
 * Real links rather than a button that pushes a route: the translated page
 * exists at its own URL, so a crawler can follow it, a visitor can open it in a
 * new tab, and the control still works if the JavaScript never arrives.
 */
export function LanguageSwitcher({
  locale,
  label,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  /** Lets the mobile sheet close itself when a language is picked. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-10 items-center rounded-md border border-line p-0.5"
    >
      {locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={withLocale(pathname, item)}
            hrefLang={item}
            // Same page, same place, other language. Next.js scrolls to the
            // top of a route change by default, which here would throw away
            // whatever the reader was in the middle of reading.
            scroll={false}
            // Marks the language in use, not the current page — `aria-current`
            // is the closest thing a two-state link group has to a pressed state.
            aria-current={active ? "true" : undefined}
            onClick={() => {
              rememberLocale(item);
              onNavigate?.();
            }}
            className={`inline-flex h-full items-center rounded-[0.3rem] px-2 text-xs font-medium transition-colors ${
              active
                ? "bg-frame text-fg"
                : "text-subtle hover:text-fg"
            }`}
          >
            {/* The abbreviation is for the eye; screen readers get the name. */}
            <span className="sr-only">{localeNames[item]}</span>
            <span aria-hidden>{localeAbbreviations[item]}</span>
          </Link>
        );
      })}
    </div>
  );
}
