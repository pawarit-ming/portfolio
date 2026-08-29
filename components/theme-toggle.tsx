"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * Both icons are always rendered and CSS picks one off the `.dark` class on
 * <html>. That keeps the server and client markup identical — no `mounted`
 * flag, and no flash of the wrong icon before hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-frame hover:text-fg"
    >
      <MoonIcon className="h-[1.05rem] w-[1.05rem] dark:hidden" />
      <SunIcon className="hidden h-[1.05rem] w-[1.05rem] dark:block" />
    </button>
  );
}
