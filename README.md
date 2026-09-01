# Pawarit Wang — Portfolio

Personal portfolio site for a web and mobile developer job search, built with the
same stack the résumé claims: **Next.js 16 (App Router), TypeScript, Tailwind CSS
v4** — so the site is its own evidence.

- Homepage with hero, about, experience timeline, projects, skills and contact
- English and Thai, each on its own URL (`/en`, `/th`) and statically generated
- A case-study page per project at `/[locale]/projects/[slug]`
- Working contact form backed by a Next.js Route Handler
- SEO: per-page metadata, hreflang alternates, JSON-LD `Person` schema,
  `sitemap.xml`, `robots.txt`, and a generated Open Graph image per language

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

Everything you will realistically want to change lives in **`lib/content/`**.
The components read from it, so you never have to touch JSX to update the copy.

- **`en.ts`** and **`th.ts`** — one file per language, holding every sentence on
  the site: summary, experience, projects, skills, education, and the interface
  labels under `ui`. The two are mirror images.
- **`types.ts`** — the `Content` type both language files are checked against.
  Add a field to one language and the build fails until the other has it too,
  which is what stops an English sentence turning up on the Thai page.
- **`shared.ts`** — the things that are the same in every language: email,
  phone, social URLs, the monogram in the header, and the framework names in
  the hero. Your written-out name is not one of them — it lives in each
  language's `profile.name`, so the Thai page can spell it in Thai.

Fill in your **`socials`** URLs in `shared.ts`. A social with an empty `href` is
hidden everywhere automatically, which is why no broken links show up right now.

Editing one language and not the other is fine for prose — nothing checks that a
paragraph was actually translated, only that the field exists.

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

Until you configure it, the form never pretends to have sent something it did
not. When delivery is impossible — no API key, or Resend rejecting the request —
the response carries a `fallback` flag and the form swaps the red error for a
panel offering the address directly: an **Open in mail app** link carrying the
visitor's own subject and message, a **Copy address** button, and the address in
plain text for when the clipboard is blocked. The textarea keeps its contents
throughout, so a recruiter's message is never lost to a misconfigured deploy.

Validation failures and rate limiting still show as ordinary inline errors —
those are worth retrying, so they get the red box.

The endpoint answers with a `code` rather than a sentence, because it has no way
to know which language the page is in. The wording lives with the rest of the
copy, under `ui.form.errors` in each language file; the English sentence is sent
alongside the code so a response read in a terminal or a log still makes sense.

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

Leave a variable out entirely rather than creating it empty. An empty string is
a value, not an absence; `lib/site.ts` and the contact route both trim and treat
blanks as unset for that reason, but nothing else in the stack will.

### Before sending the link to anyone

- [ ] `RESEND_API_KEY` set in Vercel, and a test message actually arrived
- [ ] `CONTACT_TO_EMAIL` points at the inbox you read, and it is not empty
- [ ] The sender domain is verified in Resend, or the first enquiry may land in
      spam — `onboarding@resend.dev` is for testing, not for recruiters
- [ ] Submit the live form once yourself and confirm the success panel, not the
      fallback panel, is what appears
- [ ] Hit **Reply** on that test mail and check it addresses the sender rather
      than you — a wrong reply-to fails silently, and you only find out when a
      recruiter thinks you ignored them
- [ ] Open `/th` as well as `/en` and read them both — nothing checks that a
      paragraph was translated, only that the field exists, so a stale English
      sentence on the Thai page will not fail the build

## Project structure

```
proxy.ts                  Sends un-prefixed URLs to a language
app/
  globals.css             Tailwind import and design tokens
  icon.svg                Favicon
  robots.ts, sitemap.ts   SEO routes
  api/contact/route.ts    Contact form handler
  [locale]/
    layout.tsx            Root layout, fonts, metadata, header + footer
    page.tsx              Homepage, composes the sections
    not-found.tsx         404 page
    [...rest]/            Catches unknown paths and 404s them
    opengraph-image.tsx   Generated 1200x630 social preview
    projects/[slug]/      Project case-study pages
components/               Section and UI components
lib/
  i18n.ts                 Locales, cookie, path helpers
  content/                All site content — edit here
  site.ts                 Canonical site URL
public/projects/          Screenshots, one folder per project slug
```

## Languages

The site is bilingual: every page exists at `/en/...` and `/th/...`, both built
ahead of time. A visitor who lands on a URL with no language in it — `/`, or a
link to `/projects/x` — is redirected by `proxy.ts`, which picks a language from
the `NEXT_LOCALE` cookie first and the browser's `Accept-Language` header
second. The switcher in the header writes that cookie, so a deliberate choice
survives the next visit even if it disagrees with the browser.

Both languages are real links to real URLs, which is what lets a search engine
index them separately and a recruiter share one directly. Each page declares the
other as an `hreflang` alternate.

To add a third language:

1. Add its code to `locales` in `lib/i18n.ts`, along with a name, an
   abbreviation and a BCP 47 tag.
2. Copy `lib/content/en.ts` to `lib/content/<code>.ts` and translate it. The
   `Content` type will tell you if you miss anything.
3. Register it in the `content` map in `lib/content/index.ts`.

Nothing else needs touching — the routes, sitemap, hreflang tags and the
switcher are all generated from that list.

Thai text renders in Noto Sans Thai, which sits behind Geist in the font stack
in `app/globals.css`. Because browsers only download a font once a glyph needs
it, the English pages never fetch it.

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
