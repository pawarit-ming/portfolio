"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/lib/data";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
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

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-invert text-[11px] font-bold tracking-tight text-on-invert"
          >
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-frame hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1">
            <ThemeToggle />
          </span>
          {/* The contact form, not a mailto: — a visitor whose machine has no
              mail client configured gets nothing at all from a mailto, and this
              button shows no address to fall back on. */}
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-md bg-invert px-3.5 py-2 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
          >
            Get in touch
          </Link>
        </nav>

        <div className="-mr-2 flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-body transition-colors hover:bg-frame"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
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
          aria-label="Main"
          className="border-t border-line bg-card md:hidden"
        >
          <ul className="mx-auto w-full max-w-5xl px-4 py-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-md px-3 py-2.5 text-sm text-body transition-colors hover:bg-frame"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-3 pt-2 pb-1">
              <Link
                href="/#contact"
                onClick={close}
                className="inline-flex w-full items-center justify-center rounded-md bg-invert px-3.5 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
