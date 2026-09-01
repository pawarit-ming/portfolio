/**
 * Content lookup by locale.
 *
 * Both language files are imported statically rather than through `import()`.
 * The Next.js i18n guide reaches for dynamic imports to keep dictionaries out
 * of the bundle, but that argument is about client bundles: everything here is
 * read in Server Components, so nothing ships to the browser either way. In
 * return `getContent` stays synchronous and the components that call it do not
 * have to become async.
 */

import type { Locale } from "@/lib/i18n";
import type { Content, Project, ProjectSlug } from "./types";
import { en } from "./en";
import { th } from "./th";

const content: Record<Locale, Content> = { en, th };

export function getContent(locale: Locale): Content {
  return content[locale];
}

export function getProject(
  locale: Locale,
  slug: string,
): Project | undefined {
  return getContent(locale).projects.find((project) => project.slug === slug);
}

/**
 * Slugs are identical across languages by construction — `ProjectSlug` is a
 * union both files are typed against — so the English list stands in for all
 * of them wherever only the routes matter.
 */
export function getProjectSlugs(): ProjectSlug[] {
  return en.projects.map((project) => project.slug);
}

export * from "./types";
export * from "./shared";
