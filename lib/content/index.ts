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
import type { Content, Variant } from "./types";
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
  };
}

export * from "./types";
export * from "./shared";
export * from "./variants";
