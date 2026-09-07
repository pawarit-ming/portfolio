"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useLayoutEffect, type ComponentProps } from "react";

/**
 * `useLayoutEffect` does nothing during a server render, and React says so out
 * loud. What follows is only ever about what the browser paints, so the server
 * takes the passive hook and never reaches the warning.
 */
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Puts the theme back on <html> when the language switcher swaps the locale.
 *
 * <html> is rendered by `app/[locale]/layout.tsx`, so /en -> /th changes a
 * segment at the root and React remounts the layout. It cannot replace the
 * document element, so instead it strips every attribute off the one already
 * there and writes the new render's attributes back — and a server render knows
 * nothing about the `dark` class and `color-scheme` next-themes added in the
 * browser. Both are simply gone. No other navigation does this; only the one
 * that changes the segment above <html>.
 *
 * next-themes puts them back, but from a passive effect — a frame later, with a
 * paint in between. That single light frame is what a reader sees, and the
 * colour transition in globals.css stretches it into a fade rather than a
 * blink. Re-applying here instead, in the layout phase of the same commit that
 * wiped it, lands before the browser paints: there is no light frame to see.
 *
 * This mirrors what next-themes does for `attribute="class"` rather than
 * replacing it — the provider is still the one deciding which theme is current.
 */
function ThemeClassRestore() {
  const { resolvedTheme } = useTheme();

  useBeforePaint(() => {
    // Undefined on the server, and until the provider has read the preference.
    if (!resolvedTheme) return;

    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.classList.toggle("light", resolvedTheme === "light");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeClassRestore />
      {children}
    </NextThemesProvider>
  );
}
