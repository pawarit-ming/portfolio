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
    location: "Si Racha, Chonburi, Thailand",
    availability: "Open to developer roles",
    summary:
      "Recent Digital Science and Technology graduate from Mahidol University, looking for full-stack work. I build web apps from the React interface down to the database: an internship at the Ministry of Public Health, a Flutter senior project, and an ERP for a trading company that is already in use while I keep building it.",
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
      projectSlug: "asset-management-system",
      highlights: [
        "Contributed to 22 screens (primary author of 14) in React, Next.js and Tailwind CSS, including the five-step asset registration wizard.",
        "Connected screens to the team's NestJS REST API and fixed the issues raised in two rounds of UAT.",
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
      workflow: ["RFQs", "Purchase orders", "Stock receipts", "Invoices"],
      title: "FYT Trading ERP",
      kind: "Personal project · In use, still in development",
      period: "Jun 2026 – Present",
      tagline:
        "An ERP for a trading company, built in React and TypeScript with the business rules enforced in PostgreSQL.",
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "TanStack Query", "React Hook Form", "Zod", "Vite", "Vitest"],
      sourceNotice:
        "In use by a trading company. Source code and company data are private.",
      // Screens come from the app's demo company, filled with invented clients
      // and RFQs, so no customer of the real business appears anywhere here.
      cover: {
        src: "/projects/fyt-sme-platform/client-rfq-list.webp",
        alt: "The Client RFQ list in the FYT workspace: twenty requests for quotation with their date, channel, client, follow-up person, products, step badge and age in days",
        aspect: "screen",
      },
      gallery: [
        {
          src: "/projects/fyt-sme-platform/client-rfq-list.webp",
          alt: "The Client RFQ list in the FYT workspace: twenty requests for quotation with their date, channel, client, follow-up person, products, step badge and age in days",
          aspect: "screen",
          caption: "Client RFQs, each tracked by step and age (demo company, sample data)",
        },
        {
          src: "/projects/fyt-sme-platform/client-rfq-form.webp",
          alt: "The Create a new RFQ form: date, sequence, channel, client, contact, follow-up person and attachment, then a product row with SKU, client product name, brand, model, quantity and unit, followed by rows for a new vendor quote, quote history and our quote",
          aspect: "screen",
          caption: "Creating an RFQ: each product carries its vendor quotes, quote history and our own quote",
        },
        {
          src: "/projects/fyt-sme-platform/wi-settings.webp",
          alt: "The WI Settings hub listing 27 settings, among them brands, channels, currencies, payment terms, SKU names, step process, units and VAT rates",
          aspect: "screen",
          caption: "27 settings each company keeps for its own documents, from units and VAT rates to workflow steps",
        },
      ],
      // Counted from the repository in Oct 2026, not estimated. Recount before
      // changing them: the app is still growing.
      metrics: [
        { value: "Live", label: "In production since Aug 2026" },
        { value: "30+", label: "Feature modules in React" },
        { value: "98", label: "Tables under row-level security" },
        { value: "113", label: "Frontend test files" },
      ],
      overview: [
        "Quotations, purchase orders, stock, invoices and payments all build on each other, so no document may be duplicated or exceed the one before it. The app covers that whole chain, and the rules that keep it consistent live in the database rather than in the browser.",
      ],
      role: [
        "Built 30+ React and TypeScript modules, from RFQs and purchase orders to invoices, payroll and reports.",
        "Designed row-level security on 98 tables so each company sees only its own data.",
        "Wrote database transactions that compute VAT on the server and block over-receiving and over-invoicing.",
      ],
      features: [
        { title: "Purchasing and inventory", description: "Partial stock receipts, with over-receiving refused by the database." },
        { title: "Invoicing and payments", description: "Partial invoices and payments, with VAT and totals computed on the server." },
        { title: "Set up per company", description: "27 settings and per-document workflow steps, so each company keeps its own catalogues and process." },
      ],
    },
    {
      slug: "asset-management-system",
      workflow: ["Registration", "Borrowing", "Inspection", "Disposal"],
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
      cover: {
        src: "/projects/asset-management-system/registration-wizard.webp",
        alt: "Step one of the asset registration wizard: a progress bar naming all five steps, above a contract form filled in with a project number, budget, contract number and Thai-format dates",
        aspect: "screen",
      },
      gallery: [
        {
          src: "/projects/asset-management-system/registration-wizard.webp",
          alt: "Step one of the asset registration wizard: a progress bar naming all five steps, above a contract form filled in with a project number, budget, contract number and Thai-format dates",
          aspect: "screen",
          caption: "Step one of the five-step registration wizard",
        },
        {
          src: "/projects/asset-management-system/inspection.webp",
          alt: "The annual inspection screen, filtered to Buddhist-era budget year 2568, listing equipment with asset numbers, GFMIS codes, brand, model and location; each row carries a status badge and an inspection checkbox",
          aspect: "screen",
          caption:
            "Annual inspection, ticked off row by row and filtered by พ.ศ. budget year",
        },
        {
          src: "/projects/asset-management-system/add-supplier.webp",
          alt: "The add-supplier form, filled in: tax ID and GFMIS code, seller and company name, then a Thai address split across building, room, floor, house number, soi, street, district and postcode",
          aspect: "screen",
          caption: "Adding a supplier without losing the half-filled form behind it",
        },
      ],
      metrics: [
        // Matches the CV word for word: 22 contributed to, 14 as primary author.
        { value: "22", label: "Screens I worked on" },
        { value: "14", label: "As primary author" },
        { value: "6", label: "People on the project" },
        { value: "6 mo", label: "Internship" },
      ],
      overview: [
        "The Ministry tracked its equipment in Excel. The replacement is a Next.js frontend on a NestJS and MySQL API, built over six months by six people, two of us on the frontend.",
      ],
      role: [
        "Worked on 22 screens across seven areas, 14 of them as primary author.",
        "Built the five-step asset registration wizard.",
        "Connected screens to the team's NestJS REST API and fixed the issues raised in two rounds of UAT.",
      ],
      features: [
        { title: "Five-step registration wizard", description: "Contract, attributes, purchase, details and review, one step at a time." },
        { title: "Borrowing and returns", description: "Records who has each item and when it is due back." },
        { title: "Reporting suite", description: "Five filtered reports, including a Buddhist-era budget-year filter." },
      ],
      links: [
        {
          label: "Source on GitHub",
          href: "https://github.com/pawarit-ming/asset-management-system",
        },
      ],
    },
    {
      slug: "thai-cattle-passport",
      workflow: ["Identity", "Health passport", "Marketplace", "New owner"],
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
      cover: {
        src: "/projects/thai-cattle-passport/cover.webp",
        alt: "Three screens of the app side by side: the owner's herd list, an animal's QR code dialog, and a marketplace listing",
        aspect: "screen",
      },
      gallery: [
        {
          src: "/projects/thai-cattle-passport/herd-list-screen.webp",
          alt: "A list of the owner's cattle, each row showing a thumbnail, tag ID, name, breed, sex, age and a status badge such as fostered or deceased",
          aspect: "phone",
          caption: "The herd list, filtered by status",
        },
        {
          src: "/projects/thai-cattle-passport/cow-profile-screen.webp",
          alt: "An animal's profile page: a photo of the cow, its tag ID, name, breed, a healthy status badge, and tabs for general information and activity",
          aspect: "phone",
          caption: "The passport itself, in the owner's view",
        },
        {
          src: "/projects/thai-cattle-passport/activity-log-screen.webp",
          alt: "A vertical timeline of an animal's activity: a pregnancy check by ultrasound, a breeding record naming the sire, and an edit history entry showing an ID being corrected",
          aspect: "phone",
          caption: "Health and activity history per animal",
        },
        {
          src: "/projects/thai-cattle-passport/qr-passport-screen.webp",
          alt: "A dialog showing an animal's tag ID above its QR code, with buttons to close or save the code to the phone's photo library",
          aspect: "phone",
          caption: "The QR code that opens the public passport",
        },
        {
          src: "/projects/thai-cattle-passport/marketplace-screen.webp",
          alt: "The cattle marketplace: a search field, a result count, and a listing card showing the animal's photo, breed, sex, weight and province, with the seller's name blurred out, above an offer button",
          aspect: "phone",
          caption: "Marketplace listings with search and filters",
        },
        {
          src: "/projects/thai-cattle-passport/seller-location-screen.webp",
          alt: "A bottom sheet titled seller and location, showing the farm plotted on a map above a blurred-out farm name and a masked phone number, with cancel and confirm-offer buttons",
          aspect: "phone",
          caption: "Seller details before an offer is confirmed",
        },
      ],
      metrics: [
        // My own build scope leads; the model numbers are a team result, so they
        // follow rather than front the card.
        { value: "25+", label: "Screens in the app" },
        { value: "94.6%", label: "Verification accuracy" },
        { value: "> 0.94", label: "AUC" },
        { value: "3", label: "People on the team" },
      ],
      overview: [
        "In Thailand a cow's health history rarely travels with it when it is sold. Our three-person senior project identifies each animal from photos with an AI model and keeps its record in one place.",
      ],
      role: [
        "Built the marketplace: listings, offers and ownership transfer.",
        "Designed the Postgres data model behind my features, and built login and password recovery.",
        "Built the QR passport, a public profile that opens straight from a scan.",
      ],
      features: [
        { title: "QR health passport", description: "Scan the code to read an animal's history, with no app or account." },
        { title: "Ownership-transfer marketplace", description: "List, make offers and hand over an animal with its full record." },
        { title: "AI identification", description: "A ConvNeXt-Tiny model, built with the team, tells whether two photos show the same cow, with 94.6% accuracy." },
      ],
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
      description:
        "A four-page Power BI dashboard on a 1.4-million-row Kaggle e-commerce dataset, prepared with five Alteryx workflows. Coursework, group of six.",
      period: "Nov 2024",
      stack: ["Alteryx", "Power BI", "ETL", "Data Visualisation"],
    },
    {
      title: "Go Healthy",
      description:
        "A Flutter workout app on Firebase Cloud Firestore. I built the login, profile, workout selection and exercise timer screens. Coursework, group of three.",
      period: "2024",
      stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    },
    {
      title: "Retail Database Design",
      description:
        "A 13-table MySQL schema for a clothing retailer, from ER diagrams through normalisation to DDL. I owned the Customer and Account Member entities. Coursework, group of five.",
      period: "Jul 2023",
      stack: ["MySQL", "SQL", "ER Modelling", "Normalisation"],
    },
    {
      title: "Game Store Website",
      description:
        "A game shop site with an Express REST API over MySQL, using parameterized queries, plus storefront and admin pages. Coursework, group of three.",
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
      note: "Asset registration on the web, and a cattle passport on mobile.",
      projects: ["asset-management-system", "thai-cattle-passport"],
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
      note: "Business rules and company-level data access in the production ERP.",
      projects: ["fyt-sme-platform"],
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
    { label: "About", hash: "#about" },
    { label: "Projects", hash: "#projects" },
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
      title: "About",
      educationHeading: "Education",
      certificationsHeading: "Certifications",
      certificateLinkLabel: "Open the {name} certificate (PDF)",
      transcript: "Transcript (PDF)",
      transcriptLinkLabel: "Open my academic transcript (PDF, opens in a new tab)",
      languagesHeading: "Languages",
    },

    experience: {
      title: "Experience",
      description:
        "Two internships: one building a frontend, one automating tests.",
      readCaseStudy: "Read the case study",
    },

    projects: {
      title: "Things I have built",
      description:
        "Each case study explains my part and the workflow behind it.",
      readCaseStudy: "Read the case study",
      otherHeading: "Other projects",
    },

    skills: {
      title: "What I work with",
      description:
        "Strongest in the React and Next.js side of the stack, comfortable enough on the backend and in mobile to build a feature end to end.",
    },

    contact: {
      title: "Let's talk",
      description:
        "I am open to developer roles in Bangkok, Chonburi, or remote. Drop me a line and I will reply.",
      rolesHeading: "Roles I am open to",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
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
      socialsHeading: "Find me online",
      builtWith: "Built with Next.js, TypeScript and Tailwind CSS.",
    },

    notFound: {
      title: "This page does not exist",
      description:
        "The link may be out of date, or the page may have moved. Everything else is still where you left it.",
      back: "Back to the homepage",
    },

    project: {
      allProjects: "All projects",
      overview: "Overview",
      whatIDid: "What I did",
      keyFeatures: "Key features",
      workflow: "The business workflow",
      screens: "Screens",
      closeImage: "Close image",
      previousImage: "Previous image",
      nextImage: "Next image",
      imageCounter: "{current} of {total}",
      nextProject: "Next project",
      interested: "Interested in working together?",
      notFoundTitle: "Project not found",
    },

    metadata: {
      descriptionTemplate: "{role} in {location}. {headline}",
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
