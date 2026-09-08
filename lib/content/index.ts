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
import type { Content, Project, ProjectSlug, Variant } from "./types";
import { en } from "./en";
import { th } from "./th";
import { variantDefinitions } from "./variants";

const content: Record<Locale, Content> = { en, th };

/**
 * The content for a page, optionally re-aimed at a role.
 *
 * A variant replaces the framing at the top and nothing else — see
 * `VariantOverride`. Spelling the merge out field by field rather than deep
 * merging is the point: what a variant can reach is visible here, so no
 * override can quietly reword an experience bullet or drop a project.
 */
export function getContent(locale: Locale, variant?: Variant): Content {
  const base = content[locale];
  if (!variant) return base;

  const override = variantDefinitions[variant].copy[locale];

  return {
    ...base,
    profile: {
      ...base.profile,
      role: override.role,
      headline: override.headline,
      availability: override.availability,
      summary: override.summary,
    },
    targetRoles: override.targetRoles,
    skillGroups: override.skillGroups,
    ui: {
      ...base.ui,
      hero: { ...base.ui.hero, stats: override.stats },
    },
  };
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
export * from "./variants";
