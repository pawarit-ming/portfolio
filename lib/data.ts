/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — no component changes needed.
 */

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin";
};

export const profile = {
  name: "Pawarit Wang",
  firstName: "Pawarit",
  initials: "PW",
  role: "Web & Mobile Developer",
  headline:
    "I build responsive web interfaces with React and Next.js, and cross-platform apps with Flutter.",
  location: "Si Racha, Chonburi, Thailand",
  email: "pawarit.ming@gmail.com",
  phone: "+66 80 778 5480",
  phoneHref: "+66807785480",
  availability: "Open to developer roles",
  summary:
    "Recent Digital Science and Technology graduate from Mahidol University with internship experience developing an asset management web application using React, Next.js, Tailwind CSS, and backend APIs. I also built a cross-platform Flutter application with Supabase, Google Maps API, QR-code profiles, and an AI-based cattle identification feature.",
  summarySecondary:
    "I care about the details that make an interface feel finished — layouts that hold up on real devices, forms that behave predictably, and loading and error states handled before anyone has to report them. A stint in test automation left me in the habit of looking for the edge cases early.",
};

/**
 * Job titles worth applying under, each backed by something on this site.
 * `short` is used where space is tight (the hero); `label` everywhere else.
 * Order matters — the first is the strongest claim.
 */
export const targetRoles = [
  { label: "Frontend Developer", short: "Frontend" },
  { label: "Mobile Developer (Flutter)", short: "Mobile (Flutter)" },
  { label: "Full-stack Developer", short: "Full-stack" },
  { label: "QA / Test Automation Engineer", short: "QA Automation" },
];

/**
 * Add your profile URLs here and they appear in the header, hero and footer.
 * Leave `href` empty and that link is hidden automatically.
 */
export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/pawarit-ming", icon: "github" },
  { label: "LinkedIn", href: "", icon: "linkedin" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  stack: string[];
  highlights: string[];
  /** Optional slug of a project page covering this role in depth. */
  projectSlug?: string;
};

export const experience: Experience[] = [
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
];

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

/** A project with a full case-study page at /projects/[slug]. */
export type Project = {
  slug: string;
  title: string;
  kind: string;
  period: string;
  tagline: string;
  stack: string[];
  metrics: Metric[];
  highlights: string[];
  overview: string[];
  role: string[];
  features: { title: string; description: string }[];
  technical: { title: string; description: string }[];
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

export const projects: Project[] = [
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
      src: "/projects/asset-management-system/registration-wizard.jpeg",
      alt: "Step one of the asset registration wizard, with a progress bar naming all five steps above a contract form and two file attachment fields",
      aspect: "screen",
    },
    gallery: [
      {
        src: "/projects/asset-management-system/registration-wizard.jpeg",
        alt: "Step one of the asset registration wizard, with a progress bar naming all five steps above a contract form and two file attachment fields",
        aspect: "screen",
        caption: "Step one of the five-step registration wizard",
      },
      {
        src: "/projects/asset-management-system/dashboard.jpeg",
        alt: "The dashboard, showing counts of tracked, damaged, borrowed and disposed equipment above budget totals, with the sidebar navigation down the left",
        aspect: "screen",
        caption: "The sidebar navigation I built, shown on the dashboard",
      },
      {
        src: "/projects/asset-management-system/request-report.jpeg",
        alt: "The registration request report: filters for category, company and Buddhist-era year above a table of requests with edit and delete actions on each row",
        aspect: "screen",
        caption: "Registration requests — note the พ.ศ. year filter",
      },
      {
        src: "/projects/asset-management-system/asset-report.jpeg",
        alt: "The asset report screen, filtering by category, supply type and budget year over a table of registered assets with status badges",
        aspect: "screen",
        caption: "The asset registry report",
      },
      {
        src: "/projects/asset-management-system/repair.jpeg",
        alt: "The repair screen: filters for disposal type, a start and end date, reporter and free text, above a table of equipment with status badges",
        aspect: "screen",
        caption: "Repair tracking, with a date-range filter",
      },
      {
        src: "/projects/asset-management-system/inspection.jpeg",
        alt: "The annual inspection screen, listing equipment with asset numbers, GFMIS codes, brand, model and location, each row carrying an inspection checkbox",
        aspect: "screen",
        caption: "Annual inspection, ticked off row by row",
      },
      {
        src: "/projects/asset-management-system/annual-report.jpeg",
        alt: "The annual report screen with export to PDF and Excel buttons, a filter row, and a table of equipment; the sidebar shows all five report types",
        aspect: "screen",
        caption: "Annual report, one of five report views",
      },
    ],
    metrics: [
      { value: "22", label: "Screens I built" },
      { value: "7", label: "Workflow areas" },
      { value: "6", label: "People on the project" },
      { value: "6 mo", label: "Internship" },
    ],
    highlights: [
      "Built responsive interfaces from Figma designs using React, Next.js and Tailwind CSS.",
      "Implemented search, filtering, pagination and modal CRUD forms with React state.",
      "Delivered 22 production-ready screens, including a five-step asset registration wizard, borrowing, repair, inspection, disposal and reporting.",
    ],
    overview: [
      "The Ministry tracks a large volume of durable equipment — computers, medical devices, furniture — and every purchase, loan, repair, inspection and disposal has to be recorded, found again later, and reported on. The paperwork was the system.",
      "The replacement was a monorepo: a Next.js frontend, a NestJS API over MySQL, and Docker Compose tying them together for local development. Six people worked on it across six months — four of us on the frontend, building from Figma designs.",
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
        title: "Repair tracking",
        description:
          "Logs a fault against a specific asset and follows it through to resolution, so the repair history of a device is visible before someone decides whether to fix it again or write it off.",
      },
      {
        title: "Inspection and disposal",
        description:
          "Scheduled condition checks, and the end-of-life flow that retires an asset along with the approval trail a government audit expects to find.",
      },
      {
        title: "Search, filter and paginate",
        description:
          "Every table screen carries the same controls: free-text search across name, asset number, brand and model, plus status and date-range filters and paging over the result.",
      },
    ],
    technical: [
      {
        title: "One table pattern, twenty-two times",
        description:
          "Rather than solving search, filtering and pagination per screen, I settled the shape once — filter state, a derived filtered list, a page slice — and repeated it. It kept behaviour identical across the app, and each new screen took noticeably less time than the one before it.",
      },
      {
        title: "Dates in the calendar the users actually file in",
        description:
          "Thai government reports are filed by Buddhist-era year, so a report filtered by 2026 means nothing to the person submitting it — they are looking for 2569. Late in the internship I went back through all five report screens and added a พ.ศ. year filter. It is a small change that decides whether the reporting section is usable at all.",
      },
      {
        title: "Schema-first form validation",
        description:
          "The registration screens use Zod for their schemas and React Hook Form to bind them, with useFieldArray for repeating asset rows. Validation rules live in one object rather than scattered across handlers, so the error messages stay consistent and adding a field is a one-line change.",
      },
      {
        title: "Accessible primitives instead of hand-rolled ones",
        description:
          "Selects, dialogs and collapsibles came from shadcn/ui on top of Radix. Keyboard handling and focus management were correct without me reimplementing them, which mattered on a system that public servants use all day.",
      },
      {
        title: "Built against mock data while the API was in flight",
        description:
          "The backend team was building the NestJS API in parallel with our screens, so most of mine ran on realistic mock fixtures shaped like the eventual response. It meant the frontend never sat idle waiting on an endpoint — and when the real routes arrived, swapping them in touched the fetch layer rather than the components.",
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
      { value: "94.6%", label: "Verification accuracy" },
      { value: "> 0.94", label: "AUC" },
      { value: "25+", label: "Screens in the app" },
      { value: "3", label: "People on the team" },
    ],
    highlights: [
      "Developed a cross-platform cattle management application using Flutter, Riverpod and Supabase, with Google Maps API for farm-location mapping.",
      "Integrated a ConvNeXt-Tiny model via REST API for individual cattle identification, averaging 94.6% accuracy and AUC > 0.94 across five folds on 1,026 images from 43 cattle.",
      "Implemented QR-code links that gave users access to cattle health profiles through a public web interface, with in-app scanning.",
      "Built 25+ screens covering farm registration, cattle onboarding, health-activity logging, and an offer/ownership-transfer marketplace.",
    ],
    overview: [
      "Cattle in Thailand change hands often, and the animal's history — vaccinations, treatments, previous owners — tends not to travel with it. A buyer takes the seller's word for it, because there is no record to check.",
      "Thai Cattle Passport gives every animal a verifiable identity and a health record that follows it. The identity is the animal itself: a ConvNeXt-Tiny model served over REST decides whether two photos show the same cow, rather than trusting an ear tag that can be swapped or lost. Trained on 1,026 images of 43 animals — selected from 1,358 collected — it averaged 94.6% accuracy and AUC above 0.94 across five folds, measured on cattle it had never seen.",
      "Three of us built it over the final year of the degree, working on the identification model together and splitting the application between us. My part was everything around the transaction — who owns the animal, who wants to buy it, and how a stranger checks its history before agreeing to anything.",
    ],
    role: [
      "Built the marketplace: listings, filtering, seller and farm details, offer tracking, and the ownership-transfer flow including foster arrangements.",
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
        title: "Farm location and mapping",
        description:
          "Farms are registered with their coordinates, and a listing can hand the buyer off to whatever map app their phone actually has.",
      },
      {
        title: "Health and activity logging",
        description:
          "Vaccinations, treatments and routine activity are logged against the individual animal — this is the history the passport exposes.",
      },
      {
        title: "Multi-step animal registration",
        description:
          "A guided capture flow walks the owner through photographing a new animal from the angles the identification model needs, with import from the gallery as a fallback.",
      },
    ],
    technical: [
      {
        title: "Identification that generalises to unseen animals",
        description:
          "The model is a metric learner rather than a classifier: ConvNeXt-Tiny maps a photo to a 128-dimensional embedding, and two pictures are the same animal when their embeddings fall inside a learned threshold. A classifier would need retraining every time a farm registers a new cow — this does not. The evaluation splits by animal, so the cattle it is tested on never appear in training, and pairs photos taken on three different cameras rather than one.",
      },
      {
        title: "A map link that works on any phone",
        description:
          "Rather than embedding a map that needs Google Play Services, opening a farm location falls through three options: Apple Maps on iOS, an Android geo: intent that hands off to whatever map app is installed, and a Google Maps web URL last. It matters here — plenty of phones in Thailand ship without Play Services, and a dead map button on a listing is a lost sale.",
      },
      {
        title: "The public route sits outside the app shell",
        description:
          "The QR code points at a go_router path registered against the root navigator rather than the tab shell, so a scan lands on a clean read-only profile instead of dropping a stranger into the owner's navigation. The same screen backs both the public view and the owner's own detail page, switched by a read-only flag.",
      },
      {
        title: "Status drives what a listing shows",
        description:
          "An animal can be for sale, fostered, soft-deleted or dead, and each state changes what should appear in the market. Filtering that at the query rather than in the widget kept the rules in one place — and stopped dead animals showing up for sale, which is the kind of bug you only find in front of a user.",
      },
      {
        title: "Riverpod over a Supabase backend",
        description:
          "Auth, Postgres and file storage came from one service, with Riverpod providers carrying auth and herd state across the screens. Access policies scope a farm's data to its owner while leaving the public passport view readable by anyone holding the QR code.",
      },
    ],
  },
];

/**
 * Smaller projects, shown as a compact grid below the featured ones.
 * Add entries here; the section hides itself while the array is empty.
 *
 * Template:
 *
 * {
 *   title: "Project name",
 *   description: "One or two sentences on what it does and why you built it.",
 *   period: "Mar 2025",
 *   stack: ["React", "TypeScript"],
 *   image: {
 *     src: "/projects/project-name/cover.png",
 *     alt: "The project's dashboard",
 *     aspect: "wide",
 *   },
 *   links: [
 *     { label: "GitHub", href: "https://github.com/you/project" },
 *     { label: "Live demo", href: "https://project.vercel.app" },
 *   ],
 * },
 */
export const otherProjects: SideProject[] = [];

export const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python", "Dart", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "Flutter", "Tailwind CSS", "Riverpod"],
  },
  {
    title: "Backend & Databases",
    items: ["Node.js", "REST APIs", "Supabase", "Firebase", "MySQL"],
  },
  {
    title: "Testing",
    items: ["Selenium", "Appium", "Katalon Studio"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Figma", "Postman"],
  },
];

export const education = {
  degree: "Bachelor of Science in Digital Science and Technology",
  faculty: "Faculty of Information and Communication Technology",
  school: "Mahidol University",
  graduated: "Graduated Jun 2026",
};

export const languages = [
  { name: "Thai", level: "Native" },
  { name: "English", level: "Intermediate — TOEIC 660, CEFR B1" },
];

export const navigation = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
