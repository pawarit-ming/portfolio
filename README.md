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
  the site: summary, experience, projects, skills, education, certifications,
  and the interface labels under `ui`. The two are mirror images.
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

### Adding certificates

Drop the PDF in `public/certificates/`, then add an entry to `certifications` in
both language files:

```ts
{
  name: "CCNAv7: Introduction to Networks",
  issuer: "Cisco Networking Academy",
  date: "Dec 2023",
  file: "/certificates/ccna-introduction-to-networks.pdf",
},
```

They appear between Education and Languages in the About card, newest first,
each name linking to its own PDF in a new tab — and in the page's `Person`
structured data as `hasCredential`. Every field is written per language: a
course name like CCNAv7 reads the same in both files, but a Thai employer's
letter does not, and the date never does. The block hides itself while the
array is empty.

Every entry needs a `file`. A certificate nobody can open is a claim, and the
reason to list these at all is that they are checkable — so anything you add
here is public, name and credential number included.

### Resume and transcript

Both PDFs live in `public/documents/` and their paths are set once, in
`documents` in `lib/content/shared.ts`:

```ts
export const documents = {
  resume: "/documents/pawarit-wang-resume.pdf",
  transcript: "/documents/pawarit-wang-transcript.pdf",
};
```

To replace either, overwrite the file at that path — the filename is what a
recruiter ends up with on disk, so keep it a name rather than `cv-final-2.pdf`.

The resume is a button in the hero, beside "View projects": someone arriving
from an application is looking for it, and it belongs with the work rather than
after the contact button. The transcript sits under the degree in the About
card's education block, because it is the evidence for the lines directly above
it. Both open in a new tab, like the certificates, and both say `(PDF)` in the
visible label — the link leaves the site for the browser's PDF viewer, and a
button that does that should say so before it is clicked. Their wording lives in
`ui.hero.resume` and `ui.about.transcript` in each language file.

Both are solid red, on the `--pdf` / `--pdf-hover` / `--on-pdf` scale in
`app/globals.css` — the same three roles `--invert` has, because they are the
same kind of control. Not the `--danger` scale beside it, which the contact form
uses to report a failure: red here means "this is a PDF", and a button that
borrows the error colour reads as a broken one.

Filled red outweighs the black "View projects" next to it, which is the point.
That button leads somewhere on the same page and a visitor who misses it scrolls
into the work anyway; the CV is the one thing in the hero that cannot be reached
any other way. Given the same outline as "Get in touch" it was the same button
twice, and the one people arrive looking for lost the row.

The value is Adobe's own red darkened until it carries white text at 4.5:1
(#c8130a, 5.91:1). It is the one scale here with no `.dark` override: everything
else in the palette is text or a surface text sits on, and those have to flip,
but a filled button brings its own background, so all it owes either theme is
white at 4.5:1 and an edge at 3:1 against what it sits on — 5.91:1 on the white
card, 3.00:1 on the dark one. A red that shifts between themes also stops being
quite the red the format is known by.

The certificate names in the same section stay unstyled: four red rows there
would be the loudest thing on the page, and they are a list to read rather than
a control to press.

The paths are shared across languages rather than written per language, unlike
`certifications`: there is one resume, in English, and a transcript is a scan of
a document that exists in one form. The Thai button says so. If a Thai resume is
ever written, move `documents` into `en.ts` / `th.ts` and take the labels with
it.

Both files are public to anyone who finds the site — a transcript carries a
student number and every grade you were given, so put one here only if you would
hand it to a stranger.

## Role variants

The site leads with development work. `/[locale]/for/dba` is the same site
re-aimed at database roles — the link to put on that application, while the
default page stays as it is for the rest.

A variant lives in `lib/content/variants.ts` and may change six things: the
role, headline, availability line and summary, the list of target roles, the
hero stats, and the chips under the headline. That is the whole of it. Everything
below — experience, projects, skills, certifications — is the same content the
default page renders, so the two cannot tell different stories about what you
have done, and a variant is a page of framing rather than a second portfolio to
keep in step.

To add one, extend `variants` in `types.ts` and add an entry to
`variantDefinitions`; the route and both languages come for free. Write nothing
a reader could not already verify further down the same page — a variant that
claims more than the evidence under it will be found out in the interview it
was meant to win.

The case studies exist under a variant too, at
`/[locale]/for/<variant>/projects/<slug>` — the same component and the same
content as the default route, so nothing is duplicated but the URL. Without
them a reader who followed "Read the case study" landed back on the default
site and every link in the header kept them there, which is the one thing the
variant is for. Links are built through `variantPrefix`, so they carry whichever
world they are in; add a link with a bare `localePath` and it will quietly
break that.

Variants are `noindex` and stay out of `sitemap.ts`, since near-identical pages
are what a search engine reads as duplicate content. They are unlisted, not
secret: nothing links to one, and anyone with the URL can open it.

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
public/certificates/      Certificate PDFs, linked from the About card
public/documents/         Resume and transcript PDFs
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
