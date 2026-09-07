import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";
import { localePath, localeTags, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

/**
 * Every page is listed once per language, and each entry carries the hreflang
 * map of its translations — that is what tells a crawler the two URLs are the
 * same page in different languages rather than duplicate content.
 */
function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [
        localeTags[locale],
        `${siteUrl}${localePath(locale, path)}`,
      ]),
    ),
  };
}

/**
 * The role variants under `/[locale]/for/` are deliberately absent. They are
 * the same page with a different heading, so listing them would offer a crawler
 * two near-identical URLs per language; they carry `noindex` for the same
 * reason. If you add one, do not add it here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ["", ...getProjectSlugs().map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: alternates(path),
    })),
  );
}
