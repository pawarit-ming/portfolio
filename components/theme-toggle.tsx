"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * Both icons are always rendered and CSS picks one off the `.dark` class on
 * <html>. That keeps the server and client markup identical — no `mounted`
 * flag, and no flash of the wrong icon before hydration.
 *
 * They are stacked and cross-faded rather than swapped with `display`, which
 * cannot be transitioned: the two would pop while the rest of the page fades.
 */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-frame hover:text-fg"
    >
      <span className="relative block h-[1.05rem] w-[1.05rem]">
        <MoonIcon className="absolute inset-0 h-full w-full transition-[opacity,transform] duration-300 ease-out dark:-rotate-90 dark:scale-75 dark:opacity-0" />
        <SunIcon className="absolute inset-0 h-full w-full rotate-90 scale-75 opacity-0 transition-[opacity,transform] duration-300 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
      </span>
    </button>
  );
}
