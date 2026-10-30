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

/** Keys the project cards and their screenshots; never shown to a visitor. */
export const projectSlugs = [
  "fyt-sme-platform",
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
};

export type Metric = { value: string; label: string };

export type ProjectLink = { label: string; href: string };

/**
 * A screenshot on the project card. `src` is a path from the site root, e.g.
 * `/projects/my-app/dashboard.webp`, and must also be imported in
 * `components/projects.tsx` so it gets its size and blur placeholder.
 *   screen — a browser screenshot, shown alone and cropped at the bottom
 *   phone  — a portrait mobile screenshot, shown in a row of handsets
 */
export type ProjectScreen = {
  src: string;
  alt: string;
  aspect: "screen" | "phone";
};

/** A featured project: one card on the homepage, no page of its own. */
export type Project = {
  slug: ProjectSlug;
  title: string;
  kind: string;
  period: string;
  tagline: string;
  stack: string[];
  screens: ProjectScreen[];
  /** The one figure in the card's top corner. */
  highlight: Metric;
  /** Repository links; the first becomes the card's button. */
  links?: ProjectLink[];
};

/**
 * A smaller project — listed compactly under the featured ones. Good for coursework, experiments and side builds
 * that are worth showing but do not carry a full write-up.
 */
export type SideProject = {
  title: string;
  /** One short line; the stack sits under it. */
  description: string;
  period?: string;
  stack: string[];
};

/**
 * Section links for the header, the mobile sheet and the footer.
 *
 * Only the hash is stored: the locale prefix is added at render time by
 * `localePath`, so no link can quietly drop a Thai reader into English.
 *
 * Contact is deliberately absent: the "Get in touch" button sits right beside
 * this list and points at the same anchor. Two adjacent controls with one
 * destination read as an oversight. The footer has no such button, so it adds
 * its own Contact link after this list.
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
  /** Shown under the availability in the hero, e.g. a willingness to move. */
  relocation: string;
  availability: string;
  /**
   * The whole of the About section's prose — one paragraph, sitting beside the
   * education card.
   *
   * It repeats what Experience and Projects say further down, and that is
   * deliberate: it is the résumé summary, and someone skimming the top of the
   * page may never reach either. Keep the summary about concrete work rather
   * than duplicating the complete technology list in Skills.
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

/**
 * A course or training certificate, listed under Education in the About card.
 *
 * `file` is the PDF itself, as a path from the site root — put the file in
 * `public/certificates/` and point at `/certificates/<name>.pdf`. Every entry
 * has one: a certificate nobody can open is a claim, and the whole reason to
 * list these is that they are checkable.
 *
 * Every field is written per language, which is why this list lives here
 * rather than in `shared.ts`. A course name like CCNAv7 is a proper noun and
 * reads the same in both files; a Thai employer's letter does not, and `date`
 * never does — Thai writes its own month abbreviations.
 */
export type Certification = {
  name: string;
  issuer: string;
  date: string;
  /** Path to the PDF in `public/`, e.g. `/certificates/ccna.pdf`. */
  file: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

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
    /**
     * The CV button beside it. The visible text names the format, because the
     * link leaves the site for the browser's PDF viewer and a button that does
     * that should say so before it is clicked.
     */
    resume: string;
    /** Accessible name for the same button, spelling out the new tab. */
    resumeLinkLabel: string;
  };

  about: {
    /** The plain noun, used as the heading. */
    title: string;
    educationHeading: string;
    certificationsHeading: string;
    /**
     * The accessible name of a certificate link, as a template over `{name}`.
     * The visible text is the certificate's own name, which says nothing about
     * where the link goes; this is what tells a screen-reader user that it
     * opens a PDF in a new tab.
     */
    certificateLinkLabel: string;
    /**
     * The transcript link in the education card — the grades behind the degree
     * printed two lines above it. Same PDF-in-a-new-tab treatment as the
     * certificates, and named the same way, since it is the same promise: the
     * claim above is checkable.
     */
    transcript: string;
    transcriptLinkLabel: string;
    languagesHeading: string;
  };

  experience: {
    title: string;
    description: string;
  };

  projects: {
    title: string;
    description: string;
    otherHeading: string;
    /** Controls for the screenshot strip and its full-size viewer. */
    screens: {
      previous: string;
      next: string;
      close: string;
      /** `{current}` and `{total}` are filled in, e.g. "2 of 6". */
      counter: string;
    };
  };

  skills: {
    title: string;
    description: string;
  };

  contact: {
    title: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
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
    navigationHeading: string;
    socialsHeading: string;
    /** The footer's own link to the Contact section, after the shared list. */
    contact: string;
    resume: string;
    resumeLinkLabel: string;
    /** Follows "© 2026 Pawarit Wang." */
    builtWith: string;
  };

  notFound: {
    title: string;
    description: string;
    back: string;
  };


  metadata: {
    /**
     * The meta description, as a template over `{role}` and `{headline}`.
     * A template rather than a joiner because the punctuation between the
     * clauses differs by language — Thai does not use a full stop the way
     * English does.
     */
    descriptionTemplate: string;
    keywords: string[];
  };
};

/**
 * A role the site can be re-aimed at, for a job application in a direction the
 * default page does not lead with. `/[locale]/for/dba` is the DBA version.
 */
export const variants = ["dba"] as const;

export type Variant = (typeof variants)[number];

/**
 * Everything a variant is allowed to change — the framing at the top, plus the
 * skills list. What I have actually done is not in here.
 *
 * Deliberately not a partial of `Content`. A variant that can override any
 * field is a second site to keep in step with the first, and the two drift the
 * moment either is edited alone. The experience, projects and certificates
 * below the hero are the same evidence whichever job is reading them, so they
 * are shared rather than copied — which also means a variant cannot quietly
 * claim something the default page does not.
 *
 * `skillGroups` is the one exception, and it is a full replacement rather than
 * a patch: a variant groups its skills the way the CV it is sent with does, and
 * that is not how the default page groups them. It may still only list things
 * the experience and projects below it already evidence.
 */
export type VariantOverride = {
  /** Replaces `profile.role` — the hero's lead line and the page title. */
  role: string;
  /** Replaces `profile.headline`. */
  headline: string;
  /** Replaces `profile.availability`, which would otherwise still say developer. */
  availability: string;
  /** Replaces `profile.summary` — the About paragraph. */
  summary: string;
  /** Replaces `targetRoles`, so the role being applied for leads. */
  targetRoles: TargetRole[];
  /**
   * Replaces `skillGroups` outright, so the section reads the way the CV sent
   * with the application does — its groups, its order, its wording. The default
   * page keeps its own grouping, which leads with languages and frameworks
   * rather than databases.
   */
  skillGroups: SkillGroup[];
};

export type Content = {
  profile: Profile;
  targetRoles: TargetRole[];
  experience: Experience[];
  projects: Project[];
  otherProjects: SideProject[];
  skillGroups: SkillGroup[];
  education: Education;
  certifications: Certification[];
  languages: LanguageSkill[];
  navigation: NavItem[];
  ui: UiCopy;
};
