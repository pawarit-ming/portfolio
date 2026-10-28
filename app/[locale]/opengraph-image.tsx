import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { latinFamily, loadFamily, ogColors, ogSize, thaiFamily } from "@/lib/og";

const fallbackProfile = getContent(defaultLocale).profile;

// A static export, so it cannot vary by language — it describes the card in the
// site's default one.
export const alt = `${fallbackProfile.name} | ${fallbackProfile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The homepage hero, as a card: the name at display size, the one-line
 * statement under it, and who and where along the bottom. No chips, no rules.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const requested = (await params).locale;
  let locale: Locale = isLocale(requested) ? requested : defaultLocale;

  let fonts = await loadFamily(locale === "th" ? thaiFamily : latinFamily);
  // No font, no Thai card. Better an English one than a grid of empty boxes.
  if (locale === "th" && !fonts.length) {
    locale = defaultLocale;
    fonts = await loadFamily(latinFamily);
  }

  const { profile } = getContent(locale);
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
              fontSize: "132px",
              fontWeight: 600,
              letterSpacing: locale === "th" ? "-2px" : "-6px",
              lineHeight: locale === "th" ? 1.2 : 0.95,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              maxWidth: "900px",
              fontSize: "34px",
              fontWeight: 400,
              lineHeight: 1.35,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", gap: "28px", fontSize: "26px" }}>
          <div style={{ display: "flex", fontWeight: 600 }}>{profile.role}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
