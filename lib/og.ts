/**
 * Shared by every `opengraph-image.tsx` in the app.
 */

export const ogSize = { width: 1200, height: 630 };

/** The site's own tokens, so a shared link looks like the page it opens. */
export const ogColors = {
  ground: "#f5f4f0",
  ink: "#141414",
  muted: "#5c5b57",
  accent: "#2d4bff",
};

export const latinFamily = "Manrope";
export const thaiFamily = "Noto Sans Thai";

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600 | 800;
  style: "normal";
};

/**
 * Satori — what `next/og` renders with — ships Latin glyphs only, so Thai text
 * comes out as empty boxes unless a font is handed to it, and the Latin it does
 * have is not the site's face. Google Fonts serves a single unsubsetted TTF per
 * weight to a client it does not recognise, which is the format Satori reads.
 *
 * Returns null instead of throwing because this runs at build time over the
 * network: if the fetch fails the card falls back rather than the build
 * failing or, worse, a Thai card full of tofu going out to every share of the
 * link.
 */
async function loadGoogleFont(
  family: string,
  weight: OgFont["weight"],
): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`,
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

/**
 * The regular, semibold and extrabold cuts of one family, whichever arrived.
 * Noto Sans Thai covers Latin too, so a Thai card needs nothing else.
 */
export async function loadFamily(family: string): Promise<OgFont[]> {
  const weights: OgFont["weight"][] = [400, 600, 800];
  const loaded = await Promise.all(
    weights.map(async (weight) => {
      const data = await loadGoogleFont(family, weight);
      return data ? { name: family, data, weight, style: "normal" as const } : null;
    }),
  );
  return loaded.filter((font): font is OgFont => font !== null);
}
