/**
 * English content. The Thai version in `th.ts` mirrors this file key for key —
 * `Content` is what keeps the two honest, so add a field here and the build
 * will not pass until `th.ts` has it too.
 */

import type { Content } from "./types";

export const en: Content = {
  profile: {
    name: "Pawarit Wang",
    role: "Full-stack & Mobile Developer",
    headline:
      "I build web apps in React and mobile apps in Flutter, and test them the way a test automation internship taught me to.",
    relocation: "Available to relocate to Bangkok",
    availability: "Open to developer roles",
    summary:
      "Recent Digital Science and Technology graduate from Mahidol University, looking for full-stack work.",
  },

  /**
   * Job titles worth applying under, each backed by something on this site.
   * `short` is used where space is tight (the hero); `label` everywhere else.
   * Order matters — the first is the strongest claim.
   */
  targetRoles: [
    { label: "Full-stack Developer", short: "Full-stack" },
    { label: "Frontend Developer", short: "Frontend" },
    { label: "Mobile Developer (Flutter)", short: "Mobile (Flutter)" },
    { label: "QA / Test Automation Engineer", short: "QA Automation" },
  ],

  experience: [
    {
      role: "Frontend Developer Intern",
      company: "Ministry of Public Health",
      period: "Jun 2025 – Nov 2025",
      stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Zod", "Figma"],
      highlights: [
        "Contributed to 22 screens (primary author of 14) in React, Next.js and Tailwind CSS, including the five-step asset registration wizard.",
      ],
    },
    {
      role: "Test Automation Intern",
      company: "Celestica (Thailand) Limited",
      period: "May 2024 – Jul 2024",
      stack: ["Java", "Appium", "Android", "Extent Reports"],
      highlights: [
        "Wrote the test plan for an Android Bluetooth motor-control app and automated the full suite in Java with Appium, on emulators and physical devices.",
        "Reported each run through Extent Reports, giving the team a per-test pass/fail breakdown.",
      ],
    },
  ],

  projects: [
    {
      slug: "fyt-sme-platform",
      title: "FYT Trading ERP",
      kind: "Personal project · In use, still in development",
      period: "Jun 2026 – Present",
      tagline:
        "An ERP I built on my own for a trading company, in React and TypeScript with the business rules enforced in PostgreSQL.",
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "TanStack Query", "React Hook Form", "Zod", "Vite", "Vitest"],
      screens: [
        { src: "/projects/fyt-sme-platform/landing.webp", alt: "The FYT ERP Trading start page: the headline ERP Trading Software for SME trading companies, from RFQ to credit received with a monthly financial report, a Sign in button, and the six stages Client RFQ, Vendor Quotation, Our Quotation, Client PO, Our PO and Our Invoice", aspect: "screen" },
        { src: "/projects/fyt-sme-platform/client-rfq-form.webp", alt: "The Create a new RFQ form: date, sequence, channel, client, contact, follow-up person and attachment, then a product row with SKU, client product name, brand, model, quantity and unit, followed by rows for a new vendor quote, quote history and our quote", aspect: "screen" },
        { src: "/projects/fyt-sme-platform/client-rfq-list.webp", alt: "The Client RFQ list in the FYT workspace: twenty requests for quotation with their date, channel, client, follow-up person, products, step badge and age in days", aspect: "screen" },
        { src: "/projects/fyt-sme-platform/wi-settings.webp", alt: "The WI Settings hub listing 27 settings, among them brands, channels, currencies, payment terms, SKU names, step process, units and VAT rates", aspect: "screen" },
      ],
      highlight: { value: "Live", label: "In production since Aug 2026" },
    },
    {
      slug: "asset-management-system",
      title: "Asset Management System",
      kind: "Internship · Ministry of Public Health",
      period: "Jun 2025 – Nov 2025",
      tagline:
        "A government system tracking equipment from purchase to disposal. Team of six; I worked on 22 screens, 14 as primary author.",
      stack: [
        "Next.js",
        "React",
        "JavaScript",
        "Tailwind CSS",
        "shadcn/ui",
        "React Hook Form",
        "Zod",
        "Figma",
      ],
      screens: [
        { src: "/projects/asset-management-system/registration-wizard.webp", alt: "Step one of the asset registration wizard: a progress bar naming all five steps, above a contract form filled in with a project number, budget, contract number and Thai-format dates", aspect: "screen" },
        { src: "/projects/asset-management-system/inspection.webp", alt: "The annual inspection screen, filtered to Buddhist-era budget year 2568, listing equipment with asset numbers, GFMIS codes, brand, model and location; each row carries a status badge and an inspection checkbox", aspect: "screen" },
        { src: "/projects/asset-management-system/add-supplier.webp", alt: "The add-supplier form, filled in: tax ID and GFMIS code, seller and company name, then a Thai address split across building, room, floor, house number, soi, street, district and postcode", aspect: "screen" },
      ],
      highlight: { value: "22", label: "Screens I worked on" },
      links: [
        {
          label: "Source on GitHub",
          href: "https://github.com/pawarit-ming/asset-management-system",
        },
      ],
    },
    {
      slug: "thai-cattle-passport",
      title: "Thai Cattle Passport",
      kind: "Senior Project · Mahidol University",
      period: "Sep 2025 – May 2026",
      tagline:
        "An app that gives every cow a verifiable identity and a health record that follows it to its next owner. I built the marketplace, login and QR passport.",
      stack: [
        "Flutter",
        "Dart",
        "Riverpod",
        "go_router",
        "Supabase",
        "PostgreSQL",
        "Google Maps",
        "QR & Camera",
      ],
      screens: [
        { src: "/projects/thai-cattle-passport/herd-list-screen.webp", alt: "A list of the owner's cattle, each row showing a thumbnail, tag ID, name, breed, sex, age and a status badge such as fostered or deceased", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/cow-profile-screen.webp", alt: "An animal's profile page: a photo of the cow, its tag ID, name, breed, a healthy status badge, and tabs for general information and activity", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/activity-log-screen.webp", alt: "A vertical timeline of an animal's activity: a pregnancy check by ultrasound, a breeding record naming the sire, and an edit history entry showing an ID being corrected", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/qr-passport-screen.webp", alt: "A dialog showing an animal's tag ID above its QR code, with buttons to close or save the code to the phone's photo library", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/marketplace-screen.webp", alt: "The cattle marketplace: a search field, a result count, and a listing card showing the animal's photo, breed, sex, weight and province, with the seller's name blurred out, above an offer button", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/seller-location-screen.webp", alt: "A bottom sheet titled seller and location, showing the farm plotted on a map above a blurred-out farm name and a masked phone number, with cancel and confirm-offer buttons", aspect: "phone" },
      ],
      highlight: { value: "25+", label: "Screens in the app" },
      links: [
        {
          label: "Source on GitHub",
          href: "https://github.com/pawarit-ming/thai-cattle-passport",
        },
      ],
    },
  ],

  /**
   * Smaller projects, shown as a compact grid below the featured ones.
   * Add entries here; the section hides itself while the array is empty.
   * Remember to add the same entry to `th.ts`.
   */
  // Newest first. A year on its own sorts after the months of that year.
  otherProjects: [
    {
      title: "E-commerce Analytics Dashboard",
      description: "A Power BI dashboard on 1.4 million rows of Kaggle data, prepared in Alteryx.",
      period: "Nov 2024",
      stack: ["Alteryx", "Power BI", "ETL", "Data Visualisation"],
    },
    {
      title: "Go Healthy",
      description: "A Flutter workout app. I built the login, profile and exercise timer.",
      period: "2024",
      stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    },
    {
      title: "Retail Database Design",
      description: "A 13-table MySQL schema for a clothing retailer, from ER diagram to DDL.",
      period: "Jul 2023",
      stack: ["MySQL", "SQL", "ER Modelling", "Normalisation"],
    },
    {
      title: "Game Store Website",
      description: "A game shop with an Express REST API over MySQL.",
      period: "2023",
      stack: ["Node.js", "Express", "MySQL", "REST API", "JavaScript", "HTML", "CSS"],
    },
  ],

  skillGroups: [
    {
      title: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "Python", "Dart", "SQL", "HTML", "CSS"],
    },
    {
      title: "Frontend & mobile",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "React Hook Form",
        "Zod",
        "TanStack Query",
        "Flutter",
        "Riverpod",
      ],
    },
    {
      title: "Databases",
      items: ["MySQL", "PostgreSQL", "Supabase", "Firebase"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "REST APIs"],
    },
    {
      title: "Testing",
      items: ["Selenium", "Appium", "Katalon Studio"],
    },
    {
      title: "Tools",
      items: ["Git", "GitHub", "Vite", "Figma", "Postman"],
    },
  ],

  education: {
    degree: "Bachelor of Science in Digital Science and Technology",
    faculty: "Faculty of Information and Communication Technology",
    school: "Mahidol University",
    graduated: "Graduated Jun 2026",
  },

  /**
   * Newest first, the way the experience list runs. The PDFs sit in
   * `public/certificates/` and each entry links straight to its own.
   */
  certifications: [
    {
      name: "Internship Certificate",
      issuer: "Ministry of Public Health",
      date: "Nov 2025",
      file: "/certificates/internship-ministry-of-public-health.pdf",
    },
    {
      name: "IoT Fundamentals: Connecting Things",
      issuer: "Cisco Networking Academy",
      date: "May 2024",
      file: "/certificates/iot-fundamentals-connecting-things.pdf",
    },
    {
      name: "CCNAv7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "Dec 2023",
      file: "/certificates/ccna-introduction-to-networks.pdf",
    },
    {
      name: "Furukawa Cabling System (FCS)",
      issuer: "Furukawa Electric",
      date: "Oct 2023",
      file: "/certificates/furukawa-cabling-system.pdf",
    },
  ],

  languages: [
    { name: "Thai", level: "Native" },
    { name: "English", level: "Intermediate (TOEIC 660, CEFR B1)" },
  ],

  navigation: [
    { label: "Projects", hash: "#projects" },
    { label: "About", hash: "#about" },
    { label: "Experience", hash: "#experience" },
    { label: "Skills", hash: "#skills" },
  ],

  ui: {
    skipToContent: "Skip to content",
    mainNavLabel: "Main",
    footerNavLabel: "Footer",
    getInTouch: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToggle: "Toggle colour theme",
    languageLabel: "Language",

    hero: {
      viewProjects: "View projects",
      // "Resume", not the accented "résumé". The accents are the formally
      // correct spelling and they buy nothing here: every job board and every
      // Thai job ad writes it plain, and nobody has ever read a button beside
      // a CV as the verb.
      resume: "Resume (PDF)",
      resumeLinkLabel: "Open my resume (PDF, opens in a new tab)",
    },

    about: {
      title: "A bit about me",
      educationHeading: "Education",
      certificationsHeading: "Certifications",
      certificateLinkLabel: "Open the {name} certificate (PDF)",
      transcript: "Transcript (PDF)",
      transcriptLinkLabel: "Open my academic transcript (PDF, opens in a new tab)",
      languagesHeading: "Languages",
    },

    experience: {
      title: "Where I have worked",
      description:
        "Two internships: one building a frontend, one automating tests.",
    },

    projects: {
      title: "Things I have built",
      description:
        "Three projects, and the part of each that was mine.",
      otherHeading: "Other projects",
      screens: {
        previous: "Previous image",
        next: "Next image",
        close: "Close image",
        counter: "{current} of {total}",
      },
    },

    skills: {
      title: "What I work with",
      description:
        "Strongest in the React and Next.js side of the stack, comfortable enough on the backend and in mobile to build a feature end to end.",
    },

    contact: {
      title: "Let's talk",
      description:
        "I am open to developer roles based in Bangkok, or remote. Drop me a line and I will reply.",
      emailLabel: "Email",
      phoneLabel: "Phone",
    },

    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about the role or the project.",
      companyLabel: "Company",
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Message sent",
      successBody:
        "Thanks for reaching out. I will get back to you as soon as I can.",
      sendAnother: "Send another message",
      orEmailDirectly: "Or email me directly at",
      fallbackBody:
        "Nothing is lost: your message is still in the box above. Send it straight to my inbox instead:",
      openInMailApp: "Open in mail app",
      copyAddress: "Copy address",
      addressCopied: "Address copied",
      mailtoSubject: "Portfolio enquiry",
      mailtoSubjectFrom: "Portfolio enquiry from {name}",
      errors: {
        invalid_body: "Something went wrong. Please try again.",
        missing_fields: "Name, email and message are all required.",
        too_long: "That message is too long.",
        invalid_email: "That email address does not look right.",
        rate_limited: "Too many messages just now. Please try again in a minute.",
        not_configured: "Email delivery is not configured on this deployment.",
        provider_rejected: "The mail service rejected the message.",
        delivery_failed: "The message could not be delivered.",
        unknown: "Something went wrong. Please try again.",
      },
    },

    footer: {
      navigationHeading: "Explore",
      socialsHeading: "Elsewhere",
      contact: "Contact",
      resume: "Resume (PDF)",
      resumeLinkLabel: "Open my resume (PDF, opens in a new tab)",
      builtWith: "Built with Next.js, TypeScript and Tailwind CSS.",
    },

    notFound: {
      title: "This page does not exist",
      description:
        "The link may be out of date, or the page may have moved. Everything else is still where you left it.",
      back: "Back to the homepage",
    },


    metadata: {
      descriptionTemplate: "{role}. {headline}",
      keywords: [
        "Web Developer",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Flutter",
        "Dart",
        "Thailand",
      ],
    },
  },
};
