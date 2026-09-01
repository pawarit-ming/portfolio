/**
 * The shape every language file has to satisfy.
 *
 * This is the whole safety net for the translations: `en.ts` and `th.ts` are
 * both typed as `Content`, so a key added to one and forgotten in the other is
 * a build error rather than an English sentence surfacing on the Thai page.
 */

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin";
};

/**
 * Slugs are shared across languages on purpose — the switcher swaps the locale
 * segment and leaves the rest of the path alone, so `/en/projects/x` has to
 * have a `/th/projects/x` to land on. Typing them as a union means a typo in
 * one language file fails the build instead of 404ing in production.
 */
export const projectSlugs = [
  "asset-management-system",
  "thai-cattle-passport",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type Experience = {
  role: string;
  company: string;
  period: string;
  stack: string[];
  highlights: string[];
  /** Optional slug of a project page covering this role in depth. */
  projectSlug?: ProjectSlug;
};

export type Metric = { value: string; label: string };

export type ProjectLink = { label: string; href: string };

/**
 * Images live in `public/`, so `src` is a path from the site root —
 * e.g. `/projects/my-app/dashboard.png`.
 *
 * `aspect` controls how the shot is framed. Screenshots are shown whole, since
 * cropping one costs you a sidebar or a toolbar; photos may crop to fill.
 *   wide   — cropped to fill a 16:10 frame (default)
 *   tall   — cropped to fill a 3:4 frame
 *   square — cropped to fill
 *   screen — a browser screenshot, shown whole in a 16:10 frame
 *   phone  — a portrait mobile screenshot, shown whole in a handset-shaped frame
 */
export type ProjectImage = {
  src: string;
  alt: string;
  aspect?: "wide" | "tall" | "square" | "screen" | "phone";
  caption?: string;
};

/** A project with a full case-study page at /[locale]/projects/[slug]. */
export type Project = {
  slug: ProjectSlug;
  title: string;
  kind: string;
  period: string;
  tagline: string;
  stack: string[];
  metrics: Metric[];
  overview: string[];
  role: string[];
  features: { title: string; description: string }[];
  /** Thumbnail for the project card on the homepage. */
  cover?: ProjectImage;
  /** Extra screenshots shown further down the case-study page. */
  gallery?: ProjectImage[];
  /** Live demo / repository links, shown on the case-study page. */
  links?: ProjectLink[];
};

/**
 * A smaller project — listed compactly under the featured ones, with no
 * case-study page of its own. Good for coursework, experiments and side builds
 * that are worth showing but do not carry a full write-up.
 */
export type SideProject = {
  title: string;
  description: string;
  period?: string;
  stack: string[];
  image?: ProjectImage;
  links?: ProjectLink[];
};

/**
 * Section links for the header, the mobile sheet and the footer.
 *
 * Only the hash is stored: the locale prefix is added at render time by
 * `localePath`, so no link can quietly drop a Thai reader into English.
 *
 * Contact is deliberately absent: the "Get in touch" button sits right beside
 * this list and points at the same anchor, and the footer prints the address
 * itself. Two adjacent controls with one destination read as an oversight.
 */
export type NavItem = { label: string; hash: string };

export type Profile = {
  /**
   * Spelled per language — ปวริศ ว่อง on the Thai page, Pawarit Wang on the
   * English one. The monogram in `identity` stays Latin in both, the way a logo
   * does.
   */
  name: string;
  role: string;
  headline: string;
  location: string;
  availability: string;
  /**
   * The whole of the About section's prose — one paragraph, sitting beside the
   * education card.
   *
   * It repeats what Experience and Projects say further down, and that is
   * deliberate: it is the résumé summary, and someone skimming the top of the
   * page may never reach either. It is also the only place above the fold where
   * Supabase, the maps API, the QR profiles and the identification model are
   * named at all — the hero chips stop at the six headline frameworks.
   */
  summary: string;
};

export type TargetRole = { label: string; short: string };

export type Education = {
  degree: string;
  faculty: string;
  school: string;
  graduated: string;
};

/** A spoken language on the CV — unrelated to the site's own locales. */
export type LanguageSkill = { name: string; level: string };

export type SkillGroup = { title: string; items: string[] };

/**
 * Every failure the contact endpoint can report, as a code rather than a
 * sentence. The API cannot know which language the visitor is reading in, so it
 * names the problem and the form picks the wording.
 */
export type ContactErrorCode =
  | "invalid_body"
  | "missing_fields"
  | "too_long"
  | "invalid_email"
  | "rate_limited"
  | "not_configured"
  | "provider_rejected"
  | "delivery_failed"
  | "unknown";

export type UiCopy = {
  skipToContent: string;
  mainNavLabel: string;
  footerNavLabel: string;
  getInTouch: string;
  openMenu: string;
  closeMenu: string;
  themeToggle: string;
  /** Names the switcher for screen readers; the buttons themselves say EN / ไทย. */
  languageLabel: string;

  hero: {
    viewProjects: string;
    /** Wraps the list of target roles: "Open to" … "roles". */
    openToPrefix: string;
    openToSuffix: string;
    stats: Metric[];
  };

  about: {
    /** The plain noun, used as the heading. This section has no eyebrow. */
    title: string;
    educationHeading: string;
    languagesHeading: string;
  };

  experience: {
    eyebrow: string;
    title: string;
    description: string;
    readCaseStudy: string;
  };

  projects: {
    eyebrow: string;
    title: string;
    description: string;
    readCaseStudy: string;
    otherHeading: string;
  };

  skills: {
    eyebrow: string;
    title: string;
    description: string;
  };

  contact: {
    eyebrow: string;
    title: string;
    description: string;
    rolesHeading: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
  };

  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    companyLabel: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    orEmailDirectly: string;
    fallbackBody: string;
    openInMailApp: string;
    copyAddress: string;
    addressCopied: string;
    /** Subject line for the mailto fallback. `{name}` is replaced when known. */
    mailtoSubject: string;
    mailtoSubjectFrom: string;
    errors: Record<ContactErrorCode, string>;
  };

  footer: {
    /** Follows "© 2026 Pawarit Wang." */
    builtWith: string;
  };

  notFound: {
    title: string;
    description: string;
    back: string;
  };

  project: {
    allProjects: string;
    overview: string;
    whatIDid: string;
    keyFeatures: string;
    screens: string;
    nextProject: string;
    interested: string;
    notFoundTitle: string;
  };

  metadata: {
    /**
     * The meta description, as a template over `{role}`, `{location}` and
     * `{headline}`. A template rather than a joiner because the punctuation
     * between the clauses differs by language — Thai does not use a full stop
     * the way English does.
     */
    descriptionTemplate: string;
    keywords: string[];
  };
};

export type Content = {
  profile: Profile;
  targetRoles: TargetRole[];
  experience: Experience[];
  projects: Project[];
  otherProjects: SideProject[];
  skillGroups: SkillGroup[];
  education: Education;
  languages: LanguageSkill[];
  navigation: NavItem[];
  ui: UiCopy;
};
