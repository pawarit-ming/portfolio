import { ImageResponse } from "next/og";
import { getContent, getProject, getProjectSlugs, identity } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { loadThaiFont, ogSize } from "@/lib/og";

/**
 * The card a case-study link unfurls into on LinkedIn, LINE and the rest.
 *
 * Without this file the page had no image at all: its `generateMetadata` sets
 * `openGraph`, which replaces the parent's rather than merging with it, so the
 * homepage card did not carry over. A project's own cover would not do either —
 * the FYT one is an SVG, which none of those platforms will show.
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

  const thaiFont = locale === "th" ? await loadThaiFont() : null;
  // No font, no Thai card. Better an English one than a grid of empty boxes.
  if (locale === "th" && !thaiFont) locale = defaultLocale;

  const { profile } = getContent(locale);
  // The slug comes from generateStaticParams, so this only misses on a URL
  // nobody linked to; the English project is a better card than none.
  const project = getProject(locale, slug) ?? getProject(defaultLocale, slug);
  const fontFamily = thaiFont ? "Noto Sans Thai" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#18181b",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {identity.initials}
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#52525b" }}>
            {profile.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#2563eb",
              fontWeight: 600,
            }}
          >
            {project?.kind ?? ""}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "12px",
              fontSize: "68px",
              fontWeight: 700,
              color: "#18181b",
              letterSpacing: "-1.5px",
            }}
          >
            {project?.title ?? profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: "26px",
              color: "#52525b",
              maxWidth: "1000px",
              lineHeight: 1.4,
            }}
          >
            {project?.tagline ?? profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {(project?.stack ?? []).slice(0, 5).map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid #e4e4e7",
                fontSize: "22px",
                color: "#52525b",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: thaiFont
        ? [{ name: "Noto Sans Thai", data: thaiFont, weight: 700, style: "normal" }]
        : undefined,
    },
  );
}
