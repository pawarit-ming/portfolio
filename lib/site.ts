/**
 * Canonical origin for metadata, sitemap and OG images.
 *
 * Everything here is defensive because a bad value takes the whole build down:
 * `metadataBase: new URL(siteUrl)` throws at module evaluation, and the error
 * surfaces as "Failed to collect page data" rather than pointing at the cause.
 *
 * In particular an env var that exists but is empty — easy to create by accident
 * in a hosting dashboard — is treated as unset. `??` would not catch that, since
 * an empty string is neither null nor undefined.
 */
function toOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  // People paste bare hostnames ("my-site.vercel.app"); URL needs a scheme.
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withScheme).origin;
  } catch {
    return null;
  }
}

export const siteUrl =
  // An explicit setting always wins.
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  // Otherwise Vercel hands us the stable production domain for free, so the
  // deployed site has correct canonical URLs before anyone configures anything.
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  "http://localhost:3000";
