# Pawarit Wang — Portfolio

Personal portfolio site for a web and mobile developer job search, built with the
same stack the résumé claims: **Next.js 16 (App Router), TypeScript, Tailwind CSS
v4** — so the site is its own evidence.

- Homepage with hero, about, experience timeline, projects, skills and contact
- A case-study page per project at `/projects/[slug]`, statically generated
- Working contact form backed by a Next.js Route Handler
- SEO: per-page metadata, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`,
  and a generated Open Graph image

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Dev server with Turbopack             |
| `npm run build` | Production build                      |
| `npm start`     | Serve the production build            |
| `npm run lint`  | ESLint                                |

## Editing the content

Everything you will realistically want to change lives in **`lib/data.ts`** —
name, contact details, summary, experience, projects, skills, education. The
components read from it, so you never have to touch JSX to update the copy.

Fill in your **`socials`** URLs there. A social with an empty `href` is hidden
everywhere automatically, which is why no broken links show up right now.

### Adding projects

There are two lists, because a portfolio reads better when a couple of strong
projects get room to breathe and the rest stay out of their way.

**`projects`** — the featured ones. Each gets a full case-study page at
`/projects/<slug>`, generated at build time along with its sitemap entry. Use
this for work you want to be asked about in an interview: it has room for the
problem, what you did, the features, and the technical decisions behind them.

**`otherProjects`** — everything else, shown as a compact grid under the featured
ones: title, a sentence or two, tech tags, and links. No detail page. Good for
coursework, experiments and side builds. The whole section hides itself while the
array is empty, so there is nothing to remove if you never use it.

### Screenshots

Put image files under `public/projects/<slug>/` and reference them by path. A
project takes an optional `cover` — the thumbnail on its homepage card — and a
`gallery` array, which is every screenshot shown on the case-study page.

```ts
cover: {
  src: "/projects/asset-management-system/registration-wizard.jpeg",
  alt: "Step one of the asset registration wizard, with a progress bar",
  aspect: "screen",   // screen | phone | wide | tall | square
},
```

Use `screen` for browser screenshots and `phone` for portrait mobile ones: both
are shown whole, because cropping a screenshot costs you a sidebar or a toolbar.
The gallery lays `phone` shots three across and `screen` shots two, with the
first `screen` shot leading at full width.

Images go through `next/image`, so they are converted to WebP, resized per
breakpoint, and lazy-loaded below the fold automatically.

See `public/projects/README.md` for the full reference.

## Contact form

The form posts to `app/api/contact/route.ts`, which validates the input, applies a
small rate limit, drops honeypot submissions, and sends the message through
[Resend](https://resend.com).

Until you configure it, the form returns a clear "not configured" message and
points people at the email address instead — it never pretends to have sent
something it did not.

To turn it on:

1. Create a free Resend account and generate an API key.
2. Copy `.env.example` to `.env.local` and fill in:

   ```
   RESEND_API_KEY=re_xxxxxxxxxx
   CONTACT_TO_EMAIL=pawarit.ming@gmail.com
   CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
   ```

3. Restart the dev server.

`onboarding@resend.dev` works immediately for testing. For production, verify
your own domain in Resend and send from an address on it — deliverability is much
better, and a recruiter's mail server is less likely to file it as spam.

## Deploying

The site is a normal Next.js app, so [Vercel](https://vercel.com) is the path of
least resistance and is free for this.

```bash
git init
git add .
git commit -m "Initial commit"
```

Then create a repository on GitHub, push to it, and import the repo at
[vercel.com/new](https://vercel.com/new). Vercel detects Next.js on its own — no
build configuration needed.

In the Vercel project settings, add the environment variables:

- `NEXT_PUBLIC_SITE_URL` — optional. Canonical URLs, `sitemap.xml` and OG image
  links fall back to Vercel's own production domain, so this only needs setting
  for a custom domain. A bare hostname works; the scheme is added for you. Do
  not create it with an empty value — that is a value, not an absence.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — if you want the
  contact form live.

## Project structure

```
app/
  layout.tsx              Root layout, fonts, metadata, header + footer
  page.tsx                Homepage, composes the sections
  globals.css             Tailwind import and design tokens
  icon.svg                Favicon
  opengraph-image.tsx     Generated 1200x630 social preview
  robots.ts, sitemap.ts   SEO routes
  not-found.tsx           404 page
  api/contact/route.ts    Contact form handler
  projects/[slug]/        Project case-study pages
components/               Section and UI components
lib/
  data.ts                 All site content — edit here
  site.ts                 Canonical site URL
public/projects/          Screenshots, one folder per project slug
```

## Theming

Light and dark, with a toggle in the header. `next-themes` follows the visitor's
OS setting until they pick one, then remembers the choice.

Components never name a raw palette shade — they use semantic tokens (`bg-card`,
`text-muted`, `border-line`, `text-accent`) defined in `app/globals.css`. Both
themes are a single list of variables each, so retuning dark mode means editing
the `.dark` block and nothing else.

One trap worth knowing if you extend this: the palette is declared on `:root`
and `.dark` as plain variables, and `@theme inline` then maps them onto
Tailwind's colour utilities by reference. A direct `@theme { --color-card: #fff }`
would bake the literal into every `.bg-card` rule, and overriding the variable
under `.dark` would silently do nothing.

Both themes were checked for WCAG AA text contrast (4.5:1 body, 3:1 large).
