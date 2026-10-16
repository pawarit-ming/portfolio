import { ImageResponse } from "next/og";
import { getContent, getProject, getProjectSlugs } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { latinFamily, loadFamily, ogColors, ogSize, thaiFamily } from "@/lib/og";

/**
 * The card a case-study link unfurls into on LinkedIn, LINE and the rest.
 *
 * Without this file the page had no image at all: its `generateMetadata` sets
 * `openGraph`, which replaces the parent's rather than merging with it, so the
 * homepage card did not carry over. A project's own cover would not do either —
 * the FYT one is an SVG, which none of those platforms will show.
 *
 * It mirrors the case-study header: the title large, the statement under it,
 * and the status and whose work it is along the bottom.
 */

// Static, like the homepage card's: one alt for every project and language.
export const alt = `Project case study by ${getContent(defaultLocale).profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: requested, slug } = await params;
  let locale: Locale = isLocale(requested) ? requested : defaultLocale;

  let fonts = await loadFamily(locale === "th" ? thaiFamily : latinFamily);
  // No font, no Thai card. Better an English one than a grid of empty boxes.
  if (locale === "th" && !fonts.length) {
    locale = defaultLocale;
    fonts = await loadFamily(latinFamily);
  }

  const { profile } = getContent(locale);
  // The slug comes from generateStaticParams, so this only misses on a URL
  // nobody linked to; the English project is a better card than none.
  const project = getProject(locale, slug) ?? getProject(defaultLocale, slug);
  const fontFamily = fonts[0]?.name ?? "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ogColors.ground,
          color: ogColors.ink,
          padding: "72px",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "88px",
              fontWeight: 600,
              letterSpacing: locale === "th" ? "-1.5px" : "-3.5px",
              lineHeight: locale === "th" ? 1.25 : 1,
            }}
          >
            {project?.title ?? profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "32px",
              maxWidth: "1000px",
              fontSize: "30px",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {project?.tagline ?? profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "28px", fontSize: "24px" }}>
          <div style={{ display: "flex", fontWeight: 600 }}>{project?.kind ?? ""}</div>
          <div style={{ display: "flex", color: ogColors.muted }}>{profile.name}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
