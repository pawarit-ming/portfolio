/**
 * English content. The Thai version in `th.ts` mirrors this file key for key —
 * `Content` is what keeps the two honest, so add a field here and the build
 * will not pass until `th.ts` has it too.
 */

import type { Content } from "./types";

export const en: Content = {
  profile: {
    name: "Pawarit Wang",
    role: "Web & Mobile Developer",
    headline:
      "I build responsive web interfaces with React and Next.js, and cross-platform apps with Flutter.",
    location: "Si Racha, Chonburi, Thailand",
    availability: "Open to developer roles",
    summary:
      "Recent Digital Science and Technology graduate from Mahidol University with internship experience developing an asset management web application using React, Next.js, Tailwind CSS, and backend APIs. I also built a cross-platform Flutter application with Supabase, Google Maps API, QR-code profiles, and an AI-based cattle identification feature, designing the Postgres data model behind the parts I built.",
  },

  /**
   * Job titles worth applying under, each backed by something on this site.
   * `short` is used where space is tight (the hero); `label` everywhere else.
   * Order matters — the first is the strongest claim.
   */
  targetRoles: [
    { label: "Frontend Developer", short: "Frontend" },
    { label: "Mobile Developer (Flutter)", short: "Mobile (Flutter)" },
    { label: "Full-stack Developer", short: "Full-stack" },
    { label: "QA / Test Automation Engineer", short: "QA Automation" },
  ],

  experience: [
    {
      role: "Frontend Developer Intern",
      company: "Ministry of Public Health",
      period: "Jun 2025 — Nov 2025",
      stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Zod", "Figma"],
      projectSlug: "asset-management-system",
      highlights: [
        "Built responsive interfaces for an asset management system using React, Next.js, and Tailwind CSS based on Figma designs.",
        "Implemented search, filtering, pagination, and modal CRUD forms with React state across all asset management workflows.",
        "Delivered 22 production-ready screens, including a five-step asset registration wizard, borrowing, repair, inspection, disposal, and reporting.",
      ],
    },
    {
      role: "Test Automation Intern",
      company: "Celestica",
      period: "May 2024 — Jul 2024",
      stack: ["Java", "Appium", "Android", "Extent Reports"],
      highlights: [
        "Wrote the test plan and designed functional test cases for an Android Bluetooth motor-control app.",
        "Automated the full suite in Java with Appium, running on Android emulators and physical devices.",
        "Reported results via Extent Reports; the final regression run passed with zero failures.",
      ],
    },
  ],

  projects: [
    {
      slug: "asset-management-system",
      title: "Asset Management System",
      kind: "Internship · Ministry of Public Health",
      period: "Jun 2025 — Nov 2025",
      tagline:
        "A government platform tracking equipment across its whole life — purchase, registration, borrowing, repair, inspection, disposal. Built by a team of six; I owned twenty-two of its screens.",
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
        src: "/projects/asset-management-system/registration-wizard.png",
        alt: "Step one of the asset registration wizard: a progress bar naming all five steps, above a contract form filled in with a project number, budget, contract number and Thai-format dates",
        aspect: "screen",
      },
      gallery: [
        {
          src: "/projects/asset-management-system/registration-wizard.png",
          alt: "Step one of the asset registration wizard: a progress bar naming all five steps, above a contract form filled in with a project number, budget, contract number and Thai-format dates",
          aspect: "screen",
          caption: "Step one of the five-step registration wizard",
        },
        {
          src: "/projects/asset-management-system/inspection.png",
          alt: "The annual inspection screen, filtered to Buddhist-era budget year 2568, listing equipment with asset numbers, GFMIS codes, brand, model and location; each row carries a status badge and an inspection checkbox",
          aspect: "screen",
          caption:
            "Annual inspection, ticked off row by row — filtered by พ.ศ. budget year",
        },
        {
          src: "/projects/asset-management-system/add-supplier.png",
          alt: "The add-supplier form, filled in: tax ID and GFMIS code, seller and company name, then a Thai address split across building, room, floor, house number, soi, street, district and postcode",
          aspect: "screen",
          caption: "Adding a supplier without losing the half-filled form behind it",
        },
      ],
      metrics: [
        { value: "22", label: "Screens I built" },
        { value: "7", label: "Workflow areas" },
        { value: "6", label: "People on the project" },
        { value: "6 mo", label: "Internship" },
      ],
      overview: [
        "The Ministry tracks a large volume of durable equipment — computers, medical devices, furniture — and every purchase, loan, repair, inspection and disposal has to be recorded, found again later, and reported on. The paperwork was the system.",
        "The replacement was a monorepo: a Next.js frontend, a NestJS API over MySQL, and Docker Compose tying them together for local development. Six people worked on it across six months — two of us on the frontend, building from Figma designs.",
        "It was the first time I worked inside a team large enough that my screens had to match someone else's without us checking with each other every day.",
      ],
      role: [
        "Built 22 of the application's screens across seven areas: asset registration, asset reporting, borrowing and returns, repair, inspection, disposal, and the reporting suite.",
        "Built the whole five-step registration wizard — contract, attributes, purchasing, extra details, and a final review — plus the dialogs for adding a new project or supplier mid-flow.",
        "Built the shared sidebar navigation that every screen in the application sits inside, and rebuilt it later as the app grew.",
        "Added the search and filter controls the department actually files reports with, including a Buddhist-era year filter across all five report views.",
      ],
      features: [
        {
          title: "Five-step registration wizard",
          description:
            "Registering an asset means capturing a contract, its attributes, the purchase, supporting details, and then checking the lot before committing. Each step is its own screen with a progress bar across the top, and a supplier or project missing from the dropdowns can be added without losing the half-filled form behind it.",
        },
        {
          title: "Borrowing and returns",
          description:
            "Five screens covering internal and external borrowing, distribution, item registration and returns — recording who has a piece of equipment, when it went out and when it is due back.",
        },
        {
          title: "Reporting suite",
          description:
            "Five report views: annual summary, damaged equipment, breakdown by budget type, by project, and disposal. Each one filters a large table down to the slice a department actually has to submit.",
        },
        {
          title: "Inspection and disposal",
          description:
            "Scheduled condition checks, and the end-of-life flow that retires an asset along with the approval trail a government audit expects to find.",
        },
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
      title: "Thai Cattle Passport",
      kind: "Senior Project · Mahidol University",
      period: "Sep 2025 — May 2026",
      tagline:
        "A cattle passport app giving every animal a verifiable identity and a health record that follows it to its next owner. I built the marketplace, the auth flow, and the QR-linked public profile.",
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
        src: "/projects/thai-cattle-passport/cover.png",
        alt: "Three screens of the app side by side: the owner's herd list, an animal's QR code dialog, and a marketplace listing",
        aspect: "screen",
      },
      gallery: [
        {
          src: "/projects/thai-cattle-passport/herd-list.png",
          alt: "A list of the owner's cattle, each row showing a thumbnail, tag ID, name, breed, sex, age and a status badge such as fostered or deceased",
          aspect: "phone",
          caption: "The herd list, filtered by status",
        },
        {
          src: "/projects/thai-cattle-passport/cow-profile.png",
          alt: "An animal's profile page: a photo of the cow, its tag ID, name, breed, a healthy status badge, and tabs for general information and activity",
          aspect: "phone",
          caption: "The passport itself, in the owner's view",
        },
        {
          src: "/projects/thai-cattle-passport/activity-log.png",
          alt: "A vertical timeline of an animal's activity: a pregnancy check by ultrasound, a breeding record naming the sire, and an edit history entry showing an ID being corrected",
          aspect: "phone",
          caption: "Health and activity history per animal",
        },
        {
          src: "/projects/thai-cattle-passport/qr-passport.png",
          alt: "A dialog showing an animal's tag ID above its QR code, with buttons to close or save the code to the phone's photo library",
          aspect: "phone",
          caption: "The QR code that opens the public passport",
        },
        {
          src: "/projects/thai-cattle-passport/marketplace.png",
          alt: "The cattle marketplace: a search field, a result count, and a listing card showing the animal's photo, breed, sex, weight and province, with the seller's name blurred out, above an offer button",
          aspect: "phone",
          caption: "Marketplace listings with search and filters",
        },
        {
          src: "/projects/thai-cattle-passport/seller-location.png",
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
        "Cattle in Thailand change hands often, and the animal's history — vaccinations, treatments, previous owners — tends not to travel with it. A buyer takes the seller's word for it, because there is no record to check.",
        "Thai Cattle Passport gives every animal a verifiable identity and a health record that follows it. The identity is the animal itself: a ConvNeXt-Tiny model served over REST decides whether two photos show the same cow, rather than trusting an ear tag that can be swapped or lost.",
        "Three of us built it over the final year of the degree. My part was everything around the transaction — who owns the animal, who wants to buy it, and how a stranger checks its history before agreeing to anything.",
      ],
      role: [
        "Built the marketplace: listings, filtering, seller and farm details, offer tracking, and the ownership-transfer flow including foster arrangements.",
        "Designed the Supabase (Postgres) data model behind the features I built — owners, animals, listings, offers, ownership transfers and foster arrangements, and the activity history each animal carries.",
        "Implemented authentication end to end — login, registration, and password recovery with deep links back into the app.",
        "Built the QR passport: a public read-only cattle profile that opens straight from a scan, plus the in-app scanner and QR export to the photo library.",
        "Built the multi-step camera capture flow and image import used to register an animal's reference photos.",
        "Worked on the identification model with the team — a ConvNeXt-Tiny trained on 1,026 images of 43 animals, averaging 94.6% accuracy and AUC above 0.94 over five folds.",
      ],
      features: [
        {
          title: "QR health passports",
          description:
            "Each animal carries a QR code that resolves to a read-only profile of its health record. A buyer or vet scans it and reads the history — no app install, no account, no permission from the seller.",
        },
        {
          title: "Ownership-transfer marketplace",
          description:
            "Owners list cattle, receive offers, and transfer ownership — moving the animal's full record to the new owner along with it. Foster arrangements are handled as their own status, since an animal in someone else's care has not actually changed hands.",
        },
        {
          title: "AI cattle identification",
          description:
            "Two photos go to the model and come back as a same-animal or different-animal answer. Because it compares learned embeddings rather than picking from a fixed list, it works on cattle it was never trained on — the only thing that can work on a farm that registers new animals every month.",
        },
        {
          title: "Multi-step animal registration",
          description:
            "A guided capture flow walks the owner through photographing a new animal from the angles the identification model needs, with import from the gallery as a fallback.",
        },
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
  otherProjects: [
    {
      title: "E-commerce Analytics Dashboard",
      description:
        "Analysis of a public e-commerce dataset from Kaggle: cleaning and selection in Alteryx, then a Power BI dashboard over the result. Coursework, in a group of six.",
      period: "Nov 2024",
      stack: ["Alteryx", "Power BI", "ETL", "Data Visualisation"],
    },
    {
      title: "Retail Database Design",
      description:
        "A 13-table, 14-foreign-key schema for a clothing retailer — membership, branches, carts, orders, products, payments, shipping, employees, receipts and returns. Modelled from the business rules up: ER diagrams in Chen and Crow's Foot notation, a relational schema and a data dictionary, then the DDL and queries. Coursework in a group of five, with Uniqlo as the case study.",
      period: "Jul 2023",
      stack: ["MySQL", "SQL", "ER Modelling", "Normalisation"],
    },
  ],

  skillGroups: [
    {
      title: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "Python", "Dart", "SQL", "HTML", "CSS"],
    },
    {
      title: "Frameworks",
      items: ["React", "Next.js", "Flutter", "Tailwind CSS", "Riverpod"],
    },
    {
      title: "Databases",
      items: [
        "MySQL",
        "PostgreSQL",
        "Supabase",
        "Firebase",
        "ER Modelling",
        "Normalisation",
      ],
    },
    {
      title: "Backend",
      items: ["Node.js", "REST APIs"],
    },
    {
      title: "Testing",
      items: ["Selenium", "Appium", "Katalon Studio"],
    },
    {
      title: "Tools",
      items: ["Git", "GitHub", "Figma", "Postman"],
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
    { name: "English", level: "Intermediate — TOEIC 660, CEFR B1" },
  ],

  navigation: [
    { label: "About", hash: "#about" },
    { label: "Experience", hash: "#experience" },
    { label: "Projects", hash: "#projects" },
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
      openToPrefix: "Open to",
      openToSuffix: "roles",
      // One stat per direction I am applying in: web, mobile, test automation.
      stats: [
        { value: "22", label: "Production web screens shipped in an internship" },
        { value: "25+", label: "Screens in a cross-platform Flutter app" },
        {
          value: "Appium",
          label: "Android suite automated in Java, reported with Extent Reports",
        },
      ],
    },

    about: {
      title: "About",
      educationHeading: "Education",
      certificationsHeading: "Certifications",
      certificateLinkLabel: "Open the {name} certificate (PDF)",
      languagesHeading: "Languages",
    },

    experience: {
      eyebrow: "Experience",
      title: "Where I have worked",
      description:
        "Two internships: one shipping a production frontend, one on the other side of it — writing and automating the tests.",
      readCaseStudy: "Read the case study",
    },

    projects: {
      eyebrow: "Projects",
      title: "Things I have built",
      description:
        "Two projects that shaped how I work — a government asset platform in React and Next.js, and a Flutter app that identifies individual cattle from a photo.",
      readCaseStudy: "Read the case study",
      otherHeading: "Other projects",
    },

    skills: {
      eyebrow: "Skills",
      title: "What I work with",
      description:
        "Strongest in the React and Next.js side of the stack, comfortable enough on the backend and in mobile to build a feature end to end.",
    },

    contact: {
      eyebrow: "Contact",
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
        "Thanks for reaching out — I will get back to you as soon as I can.",
      sendAnother: "Send another message",
      orEmailDirectly: "Or email me directly at",
      fallbackBody:
        "Nothing is lost — your message is still in the box above. Send it straight to my inbox instead:",
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
      screens: "Screens",
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
