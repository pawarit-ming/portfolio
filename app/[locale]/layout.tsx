import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getContent } from "@/lib/content";
import {
  isLocale,
  localePath,
  localeTags,
  locales,
  openGraphLocales,
} from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * The Thai half of the font stack. `preload: false` on purpose: the variable is
 * set on every page, but a browser only downloads a font once a glyph actually
 * needs it, so the English pages never fetch this and do not pay for a preload
 * hint they would ignore.
 */
const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  preload: false,
});

/** Both language versions are built ahead of time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** hreflang map, so a search engine knows the two pages are translations. */
function languageAlternates(path = "") {
  return Object.fromEntries(
    locales.map((locale) => [localeTags[locale], localePath(locale, path)]),
  );
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { profile, targetRoles, ui } = getContent(locale);

  const description = ui.metadata.descriptionTemplate
    .replace("{role}", profile.role)
    .replace("{location}", profile.location)
    .replace("{headline}", profile.headline);

  const title = `${profile.name} — ${profile.role}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s — ${profile.name}`,
    },
    description,
    keywords: [
      ...targetRoles.map((role) => role.label),
      ...ui.metadata.keywords,
      // Every spelling of the name, on both pages: someone searching in either
      // script should land on the site rather than only half of it.
      ...locales.map((other) => getContent(other).profile.name),
    ],
    authors: [{ name: profile.name }],
    creator: profile.name,
    alternates: {
      canonical: localePath(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: openGraphLocales[locale],
      url: localePath(locale),
      siteName: title,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  // A hand-typed `/de` reaches this layout before any page does. Rejecting it
  // here means the rest of the tree can treat the locale as known-good.
  if (!isLocale(locale)) notFound();

  const { ui, navigation, profile } = getContent(locale);

  return (
    <html
      lang={localeTags[locale]}
      // Tells Next.js that the smooth scrolling in globals.css is deliberate,
      // so it can switch to `auto` while it repositions the page on a route
      // change. Without it that reposition inherits `smooth` and the reader
      // watches the page glide instead of arriving. Hash links are exempt and
      // keep gliding, which is the case the property was added for.
      data-scroll-behavior="smooth"
      // next-themes writes the theme class here before paint, which the server
      // render cannot know about.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans">
        {/* `disableTransitionOnChange` is deliberately absent: it exists to
            suppress the colour transition while the theme swaps, and that
            transition is the point here. globals.css keeps it to paint
            properties so nothing layout-related animates. */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-invert focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-invert"
          >
            {ui.skipToContent}
          </a>
          <SiteHeader
            locale={locale}
            ui={ui}
            navigation={navigation}
            name={profile.name}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter
            locale={locale}
            ui={ui}
            navigation={navigation}
            name={profile.name}
            role={profile.role}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
