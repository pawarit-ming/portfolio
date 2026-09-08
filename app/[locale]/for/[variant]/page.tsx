import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeSections } from "@/components/home-sections";
import { getContent, variantDefinitions, variants } from "@/lib/content";
import type { Variant } from "@/lib/content";
import { isLocale, localePath, locales, localeTags } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

/**
 * The portfolio re-aimed at one role — the link that goes on an application for
 * a job the default page does not lead with.
 *
 * Everything below the hero is the same page, from the same content: only the
 * framing at the top changes. See `VariantOverride` for what a variant may
 * touch, and why the list is short.
 *
 * These are unlisted rather than secret. They are kept out of `sitemap.ts` and
 * marked `noindex` below, because two URLs carrying near-identical content is
 * exactly what a search engine reads as duplication — and because the point of
 * one is that it arrives with an application, not through a search.
 */

function isVariant(value: string): value is Variant {
  return (variants as readonly string[]).includes(value);
}

/** Every language of every variant, built ahead of time like the rest. */
export function generateStaticParams() {
  return variants.map((variant) => ({ variant }));
}

function variantPath(variant: Variant) {
  return `/for/${variant}`;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/for/[variant]">): Promise<Metadata> {
  const { locale, variant } = await params;
  if (!isLocale(locale) || !isVariant(variant)) return {};

  const { profile, targetRoles, ui } = getContent(locale, variant);
  const path = variantPath(variant);

  const description = ui.metadata.descriptionTemplate
    .replace("{role}", profile.role)
    .replace("{location}", profile.location)
    .replace("{headline}", profile.headline);

  return {
    // `absolute` because the layout's template would otherwise append the name
    // a second time; the default page's title is built the same way round.
    title: { absolute: `${profile.name} — ${profile.role}` },
    description,
    keywords: [...targetRoles.map((role) => role.label), ...ui.metadata.keywords],
    // Metadata merges shallowly and the last segment wins, so this replaces the
    // layout's `alternates` and `robots` outright rather than merging into
    // them — which is why both are spelled out in full.
    alternates: {
      canonical: localePath(locale, path),
      languages: Object.fromEntries(
        locales.map((other) => [
          localeTags[other],
          localePath(other, path),
        ]),
      ),
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}${localePath(locale, path)}`,
      title: `${profile.name} — ${profile.role}`,
      description,
    },
    robots: { index: false, follow: false },
  };
}

export default async function VariantHome({
  params,
}: PageProps<"/[locale]/for/[variant]">) {
  const { locale, variant } = await params;
  if (!isLocale(locale) || !isVariant(variant)) notFound();

  return (
    <HomeSections
      locale={locale}
      content={getContent(locale, variant)}
      stack={variantDefinitions[variant].stack}
      resume={variantDefinitions[variant].resume}
      basePath={`/for/${variant}`}
    />
  );
}
