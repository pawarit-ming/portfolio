import { ImageResponse } from "next/og";
import { getContent, identity } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { loadThaiFont, ogSize } from "@/lib/og";

const fallbackProfile = getContent(defaultLocale).profile;

// A static export, so it cannot vary by language — it describes the card in the
// site's default one.
export const alt = `${fallbackProfile.name} | ${fallbackProfile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
