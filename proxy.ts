import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  locales,
  matchLocale,
  type Locale,
} from "@/lib/i18n";

/**
 * Sends every un-prefixed request to a language.
 *
 * Named `proxy` rather than `middleware`: the file convention was renamed in
 * Next.js 16 and `middleware.ts` is deprecated. The behaviour is unchanged.
 *
 * Order matters. An explicit choice — the cookie the switcher writes — beats
 * the browser's `Accept-Language`, otherwise a Thai speaker who deliberately
 * picked English would be bounced back to Thai on their next visit.
 */
function resolveLocale(request: NextRequest): Locale {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;

  return matchLocale(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  const url = request.nextUrl.clone();
  // `/` must not become `/en/`, which would then redirect again.
  url.pathname = `/${resolveLocale(request)}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  // The destination depends on request headers, so a shared cache must not
  // serve one visitor's language to the next.
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  /**
   * Everything except API routes, Next's internals, and any path with a file
   * extension — which is what keeps `/projects/*.png` in `public/`, plus
   * `robots.txt` and `sitemap.xml`, from being redirected into a language.
   */
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
