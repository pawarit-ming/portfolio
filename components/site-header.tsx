"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// Leaf modules, not the `@/lib/content` barrel: the barrel imports every
// language file and this is a Client Component.
import type { NavItem, UiCopy } from "@/lib/content/types";
import { identity } from "@/lib/content/shared";
import { sectionHref, sectionsPath, type Locale } from "@/lib/i18n";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

/**
 * Only the strings this header shows are passed in. The whole `ui` object would
 * satisfy the type just as well, but every prop on a Client Component is
 * serialised into the RSC payload — no reason to ship the contact-form copy to
 * a visitor who is looking at the navigation.
 */
type HeaderCopy = Pick<
  UiCopy,
  | "mainNavLabel"
  | "getInTouch"
  | "openMenu"
  | "closeMenu"
  | "themeToggle"
  | "languageLabel"
>;

export function SiteHeader({
  locale,
  ui,
  navigation,
  name,
}: {
  locale: Locale;
  ui: HeaderCopy;
  navigation: NavItem[];
  /** Spelled in the current language; the monogram beside it is not. */
  name: string;
}) {
  const [open, setOpen] = useState(false);

  // Escape should dismiss the sheet the same way the close button does.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  // Section links resolve against the page they are on, so the navigation on a
  // role variant keeps the reader on that variant instead of returning them to
  // the default page.
  const pathname = usePathname() ?? "/";
  const href = (hash: string) => sectionHref(pathname, locale, hash);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 lg:px-8">
        <Link
          href={sectionsPath(pathname, locale)}
          onClick={close}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-invert text-[11px] font-bold tracking-tight text-on-invert"
          >
            {identity.initials}
          </span>
          <span className="hidden sm:inline">{name}</span>
        </Link>

        <nav aria-label={ui.mainNavLabel} className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.hash}
              href={href(item.hash)}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-frame hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 flex items-center gap-1">
            <LanguageSwitcher locale={locale} label={ui.languageLabel} />
            <ThemeToggle label={ui.themeToggle} />
          </span>
          {/* The contact form, not a mailto: — a visitor whose machine has no
              mail client configured gets nothing at all from a mailto, and this
              button shows no address to fall back on. */}
          <Link
            href={href("#contact")}
            className="inline-flex items-center rounded-md bg-invert px-3.5 py-2 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
          >
            {ui.getInTouch}
          </Link>
        </nav>

        <div className="-mr-2 flex items-center gap-1 md:hidden">
          <LanguageSwitcher
            locale={locale}
            label={ui.languageLabel}
            onNavigate={close}
          />
          <ThemeToggle label={ui.themeToggle} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-body transition-colors hover:bg-frame"
          >
            <span className="sr-only">
              {open ? ui.closeMenu : ui.openMenu}
            </span>
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={ui.mainNavLabel}
          className="border-t border-line bg-card md:hidden"
        >
          <ul className="mx-auto w-full max-w-5xl px-4 py-3">
            {navigation.map((item) => (
              <li key={item.hash}>
                <Link
                  href={href(item.hash)}
                  onClick={close}
                  className="block rounded-md px-3 py-2.5 text-sm text-body transition-colors hover:bg-frame"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-3 pt-2 pb-1">
              <Link
                href={href("#contact")}
                onClick={close}
                className="inline-flex w-full items-center justify-center rounded-md bg-invert px-3.5 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
              >
                {ui.getInTouch}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
