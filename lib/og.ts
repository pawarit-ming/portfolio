/**
 * Shared by every `opengraph-image.tsx` in the app.
 */

export const ogSize = { width: 1200, height: 630 };

/**
 * Satori — what `next/og` renders with — ships Latin glyphs only, so Thai text
 * comes out as empty boxes unless a font is handed to it. Google Fonts serves
 * this family as a single unsubsetted TTF that also covers Latin, which is why
 * one file is enough for the whole card.
 *
 * Returns null instead of throwing because this runs at build time over the
 * network: if the fetch fails the card falls back to English rather than the
 * build failing or, worse, a Thai card full of tofu going out to every share of
 * the link.
 */
export async function loadThaiFont(): Promise<ArrayBuffer | null> {
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
