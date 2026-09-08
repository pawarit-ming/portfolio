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
 * The two PDFs behind the page: the CV this site is the long form of, and the
 * transcript behind the degree in the About card.
 *
 * Paths only, and shared rather than per-language — unlike `certifications`,
 * where a Thai employer's letter really is a Thai document. There is one CV,
 * written in English, and a transcript is a scan of a document that exists in
 * a single form, so a Thai reader following either link gets the same file an
 * English one does. The labels are what differ, and those live in
 * `ui.hero.resume` and `ui.about.transcript` in each language file. Should a
 * Thai CV ever exist, this moves into `en.ts` / `th.ts` and takes the labels
 * with it.
 */
export const documents = {
  resume: "/documents/pawarit-wang-resume.pdf",
  transcript: "/documents/pawarit-wang-transcript.pdf",
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
