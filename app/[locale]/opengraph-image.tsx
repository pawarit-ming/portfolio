import { ImageResponse } from "next/og";
import { getContent, identity } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

const fallbackProfile = getContent(defaultLocale).profile;

// A static export, so it cannot vary by language — it describes the card in the
// site's default one.
export const alt = `${fallbackProfile.name} — ${fallbackProfile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Satori — what `next/og` renders with — ships Latin glyphs only, so Thai text
 * comes out as empty boxes unless a font is handed to it. Google Fonts serves
 * this family as a single unsubsetted TTF that also covers Latin, which is why
 * one file is enough for the whole card.
 *
 * Wrapped in a try/catch because this runs at build time over the network: if
 * the fetch fails the card falls back to English rather than the build failing
 * or, worse, a Thai card full of tofu going out to every share of the link.
 */
async function loadThaiFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@700",
    );
    if (!css.ok) return null;

    const url = (await css.text()).match(
      /src:\s*url\(([^)]+)\)\s*format\('truetype'\)/,
    )?.[1];
    if (!url) return null;

    const font = await fetch(url);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const requested = (await params).locale;
  let locale: Locale = isLocale(requested) ? requested : defaultLocale;

  const thaiFont = locale === "th" ? await loadThaiFont() : null;
  // No font, no Thai card. Better an English one than a grid of empty boxes.
  if (locale === "th" && !thaiFont) locale = defaultLocale;

  const { profile } = getContent(locale);
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
          <div style={{ display: "flex", fontSize: "22px", color: "#71717a" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "80px",
              fontWeight: 700,
              color: "#18181b",
              letterSpacing: "-2px",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              fontSize: "36px",
              color: "#2563eb",
              fontWeight: 600,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "26px",
              color: "#52525b",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"].map(
            (item) => (
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
            ),
          )}
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
