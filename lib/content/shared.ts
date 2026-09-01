/**
 * Content that is the same in every language.
 *
 * A name, a phone number and a list of framework names do not get translated,
 * and copying them into each language file would only create two places for
 * them to drift apart. Anything that reads as a sentence lives in `en.ts` and
 * `th.ts` instead.
 */

import type { Social } from "./types";

export const identity = {
  // The written-out name is per-language and lives in each `profile`. This
  // monogram does not follow it: it is a mark, it matches `app/icon.svg` and the
  // badge on the social card, and a mark that changes with the language stops
  // being recognisable. Move it into `Profile` if you would rather it read ปว.
  initials: "PW",
  email: "pawarit.ming@gmail.com",
  phone: "+66 80 778 5480",
  phoneHref: "+66807785480",
};

/**
 * Add your profile URLs here and they appear in the header, hero and footer.
 * Leave `href` empty and that link is hidden automatically.
 */
export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/pawarit-ming", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pawarit-wang/",
    icon: "linkedin",
  },
];

/** The chips under the hero copy. Product names, so identical either way. */
export const primaryStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Flutter",
  "Dart",
];

/** Fed to the Person JSON-LD on the homepage. */
export const knowsAbout = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Flutter",
  "Dart",
  "Frontend Development",
  "Mobile Development",
  "Test Automation",
];

/** Structured-data address, which stays in English for the crawlers. */
export const postalAddress = {
  addressLocality: "Si Racha",
  addressRegion: "Chonburi",
  addressCountry: "TH",
};
