"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Leaf modules, not the `@/lib/content` barrel: the barrel imports every
// language file and this is a Client Component.
import type { NavItem, UiCopy } from "@/lib/content/types";
import { identity, socials } from "@/lib/content/shared";
import { sectionHref, type Locale } from "@/lib/i18n";
import { socialIcons } from "@/components/icons";

/**
 * A Client Component only so that its section links can read the current path
 * — see `sectionHref`. As with the header, it is handed the few strings it
 * shows rather than the whole `ui` object, since every prop is serialised into
 * the RSC payload and the contact form's copy has no business being here.
 */
type FooterCopy = Pick<UiCopy, "footerNavLabel" | "footer">;

export function SiteFooter({
  locale,
  ui,
  navigation,
  name,
  role,
}: {
  locale: Locale;
  ui: FooterCopy;
  navigation: NavItem[];
  /** Spelled in the current language, like the header's. */
  name: string;
  role: string;
}) {
  const activeSocials = socials.filter((social) => social.href.trim() !== "");
  const pathname = usePathname() ?? "/";

  return (
    <footer className="no-print border-t border-line bg-card">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-fg">{name}</p>
            <p className="mt-1 text-sm text-muted">{role}</p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-3 inline-block text-sm text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
            >
              {identity.email}
            </a>
          </div>

          <div className="flex flex-col gap-6 sm:items-end">
            <nav aria-label={ui.footerNavLabel}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {navigation.map((item) => (
                  <li key={item.hash}>
                    <Link
                      href={sectionHref(pathname, locale, item.hash)}
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {activeSocials.length > 0 ? (
              <ul className="flex gap-2">
                {activeSocials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                      >
                        <span className="sr-only">{social.label}</span>
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {name}. {ui.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
