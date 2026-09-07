/**
 * Locale configuration for the whole site.
 *
 * Every route lives under `/[locale]`, so a locale is always known at render
 * time — no context provider, no client-side detection, and the server can
 * generate both language versions statically.
 */

export const locales = ["en", "th"] as const;

export type Locale = (typeof locales)[number];

/**
 * The language a visitor gets when nothing else decides for them. English,
 * because the audience includes recruiters who do not read Thai — a Thai
 * speaker landing on the English page still recognises the switcher, while the
 * reverse is not true.
 */
export const defaultLocale: Locale = "en";

/** Written in the language itself: a switcher labelled "Thai" helps nobody. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
};

/** Two-letter form for the switcher, where a full name would not fit. */
export const localeAbbreviations: Record<Locale, string> = {
  en: "EN",
  th: "TH",
};

/** BCP 47 tags for `<html lang>`, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  th: "th",
};

export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  th: "th_TH",
};

/**
 * Read by the proxy on the next visit so a chosen language sticks. The name is
 * Next.js's own convention, which keeps it recognisable to anyone reading the
 * request in a browser's devtools.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** A year, near enough — the cookie carries a preference, not a session. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Builds an in-site path for a locale.
 *
 * `path` is the route below the locale segment, with its leading slash —
 * `"/projects/foo"`, `"#contact"`, or `""` for the homepage. Keeping the
 * prefixing in one function is what stops a stray `href="/#about"` from
 * dropping a Thai reader back into English.
 */
export function localePath(locale: Locale, path = ""): string {
  return `/${locale}${path}`;
}

/**
 * Swaps the locale on a path that already carries one, for the switcher.
 * A path without a locale prefix simply gains one, so this is safe to call
 * with whatever `usePathname()` returns.
 */
export function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is the empty string before the leading slash.
  if (isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/");
  }

  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

/**
 * The role-variant prefix a path is standing in, or `""` for the default site.
 *
 *   /en                        -> ""
 *   /en/for/dba                -> "/for/dba"
 *   /en/for/dba/projects/x     -> "/for/dba"
 *
 * Every in-site link is built through this, which is what keeps a reader
 * inside the variant they arrived in. The variant is a path segment rather
 * than a query parameter for exactly this reason: it survives in
 * `usePathname()`, so the header and footer can read it without
 * `useSearchParams`, which on a prerendered route would push them — and every
 * page they sit on — into client rendering.
 */
export function variantPrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (!isLocale(segments[0])) return "";

  return segments[1] === "for" && segments[2] ? `/for/${segments[2]}` : "";
}

/**
 * Whether the page at `pathname` is one that carries the homepage sections:
 * the homepage itself, or a variant's homepage. A case study is not one, even
 * under a variant — its sections are elsewhere.
 */
export function hasSections(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (!isLocale(segments[0])) return false;

  // ["en"] is the homepage; ["en", "for", "dba"] is a variant's homepage.
  return (
    segments.length === 1 || (segments.length === 3 && segments[1] === "for")
  );
}

/**
 * Where a section link — `#about`, `#projects` — should point from `pathname`.
 *
 * A bare hash on a page that has the sections, which keeps the reader where
 * they are. From a case study the sections are genuinely elsewhere, so the
 * link names the homepage — the variant's homepage when reading inside one,
 * which is what stops a case study being a one-way door back to the default
 * page.
 */
export function sectionHref(
  pathname: string,
  locale: Locale,
  hash: string,
): string {
  if (hasSections(pathname)) return hash;

  return localePath(locale, `${variantPrefix(pathname)}${hash}`);
}

/** The homepage of whichever world `pathname` is in — the masthead's link. */
export function sectionsPath(pathname: string, locale: Locale): string {
  return localePath(locale, variantPrefix(pathname));
}

/**
 * Picks the best locale from an `Accept-Language` header.
 *
 * Deliberately hand-rolled: the alternative is pulling in `negotiator` and
 * `@formatjs/intl-localematcher` to choose between two languages. It reads
 * quality values so `th;q=0.9, en;q=0.8` resolves the way the visitor asked,
 * and matches on the primary subtag so `th-TH` and `en-GB` both land.
 */
export function matchLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...parameters] = part.trim().split(";");
      const quality = parameters
        .map((parameter) => parameter.trim())
        .find((parameter) => parameter.startsWith("q="));
      const parsed = quality ? Number.parseFloat(quality.slice(2)) : 1;

      return {
        // "th-TH" and "TH" both reduce to "th".
        tag: tag.trim().toLowerCase().split("-")[0],
        // A malformed q= must not outrank a well-formed one.
        quality: Number.isFinite(parsed) ? parsed : 0,
      };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const entry of ranked) {
    if (isLocale(entry.tag)) return entry.tag;
  }

  return null;
}
