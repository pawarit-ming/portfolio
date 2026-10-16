---
version: alpha
name: Pawarit Wang Portfolio
description: A bilingual developer portfolio with evidence-based project case studies.
colors:
  primary: "#1d4ed8"
  background: "#ffffff"
  surface: "#fafafa"
  foreground: "#18181b"
  border: "#e4e4e7"
typography:
  sans:
    fontFamily: "Schibsted Grotesk, Noto Sans Thai, system-ui, sans-serif"
  mono:
    fontFamily: "ui-monospace, monospace"
rounded:
  md: "0.625rem"
  lg: "1rem"
  xl: "1.25rem"
spacing:
  case-study-max: "1280px"
  card-gap: "1.25rem"
omitted:
  - section: components
    reason: Shared component implementation is canonical; no generated component tokens.
---

# Pawarit Wang Portfolio Design System

## Overview

### Creative North Star

A compact developer introduction above the software behind the claim.
Pawarit's production ERP occupies the wider opening stage, beside the concrete
document-limit rule it enforces. Government forms and cattle passport follow as
individual case studies.

Taste-skill composition: **The split stage**, seed **1801205250**, retaining
**Schibsted Grotesk** and Thai fallback. The user's screenshot feedback rejected
the previous contact-sheet direction, oversized name and scattered reading order.
The retained split-stage direction now pairs software evidence with its business
constraint, below the identity row. This revises the interchangeable name-left /
screenshot-right hero identified in the review, without changing brand tokens.
The original white, neutral grey and blue palette is retained. The user rejected
the unrequested green palette; future layout changes must preserve the existing
brand colours unless the user asks otherwise. Screenshots keep their real colours.

### Product context and register

- Audience: recruiters and engineering interviewers assessing junior web and mobile work.
- Register: public portfolio, with one visual system for home and case studies.
- Locales: English and Thai, with matching slugs and localized text and diagram labels.
- Usage: desktop review and phone browsing, with complete content available without hover.
- Signature: a large ERP screenshot beside the document-consistency rule, with
  click-to-enlarge and the actual RFQ-to-invoice sequence beneath the image.
- Restraint: no invented customers, revenue, test results or claims of sole authorship.
- Anti-reference: generic marketing dashboards presented as real product screenshots.
- Token ownership: `app/globals.css` is canonical. Its CSS variables map through
  `@theme inline` into Tailwind utilities; this file documents the established system.

### Page argument and content

- Introduction: identity, role and location on one side of a compact top row,
  description and actions on the other. Primary action: View projects; secondary:
  Resume PDF. The name is capped at 48px; do not restore oversized display type.
- Opening evidence: a single large ERP image, its project title, existing caption,
  actual RFQ-to-invoice workflow and case-study link. The copy leads with the
  family's production system. Default hero technology names live in Skills;
  role variants may retain their own focused stack. The native dialog supports enlargement; the visible image
  and real case-study link provide the plain reading fallback.
- Projects: the ERP spans the full width with text beside its RFQ form; the two
  supporting projects sit side by side with images above their descriptions.
  White rounded surfaces group each project without nested outlines or dividers.
  Three plain technology labels and unruled metrics support the contribution;
  blue case-study buttons provide the next action. Below 900px all projects stack.
  The ERP uses its RFQ form to avoid repeating the opening image.
  Featured screenshots use their intrinsic proportions with a neutral border
  (`--line-stronger`) and rounded corners directly on the image, without an extra
  padded frame. Static imports reserve their true dimensions before loading.
  Thai Cattle Passport uses three separate original phone screenshots (herd list,
  QR passport and marketplace), each with its own 2px neutral border following
  its rounded screen edges. Do not use the combined cover image for this preview:
  a border around that file surrounds the empty space rather than each screen.
- Other projects: heading above a full-width list, with each row separating
  project name/date, description and technology list into three columns. All entries
  use rounded white surfaces, separated by 1rem of space.
  At tablet widths technologies follow the description; phones stack each entry.
  Do not leave a heading-only column beside the entire list.
- About: show the existing summary, education, certificate PDFs and languages.
  The user removed the three summary statistics; do not reintroduce that strip.
- Experience: one rounded white reading area containing all three jobs, with a
  compact date/company column beside role and contribution text. Small blue
  markers and spacing identify each entry without separate cards or a timeline
  rail. Keep the metadata column narrow and stack it immediately above the role
  on phones. Omit repeated technology chips; Skills remains their complete index.
- Skills: one neutral practice panel groups Frontend/mobile and Databases with
  their actual project references. Languages, Backend, Testing and Tools form a
  compact unboxed reference beside it, with each label directly above its items.
  Keep every original technology. Project evidence determines grouping, not a
  proficiency score. No accent-colored category, percentages or rating bars.
  On phones practice precedes the reference. Variants without project references
  use a two-column reference list on desktop and one column on phones.
- Contact: one rounded white panel on the grey section ground. The left column
  groups the heading, direct contact details with small neutral icons, role chips
  and outlined social links. The right column contains the existing form on a
  pale grey surface, with white fields and a full-width send button. Stack these
  columns on phones and preserve the single inset focus outline.
- Footer: a compact rounded grey panel on white, grouping the PW monogram, name,
  role and email alongside localized navigation and social columns. Copyright
  and build credit sit below the panel; avoid repeating the name as a separate
  oversized element. On phones, identity spans the width above two link columns.

All copy comes from the existing English/Thai content, including role variants.
No sample projects, claims, testimonials or external photographs were added.

## Colors

White grounds and neutral grey tone steps distinguish sections without decorative
rules. Blue carries the primary action. Education uses a pale surface
so a large solid colour block does not compete with the actual work.
The page alternates section grounds consistently: Introduction white, Projects
grey, About white, Experience grey, Skills white, Contact grey, Footer white.
Projects, Experience and Contact use the shared tinted treatment (`--frame`,
light `#f4f4f5`). Avoid adjacent sections with the same tinted background.
The shared `section-tinted` class owns this distinction, applied through the
Section component's `tinted` prop or the composed Contact section. Project image frames and all
Other projects rows use the white card tone against their grey section ground.
Light values mirror the frontmatter. Dark equivalents live in `.dark` in
`app/globals.css`. PDF actions use the shared accent rather than a second colour.

## Typography

Schibsted Grotesk carries Latin text; Noto Sans Thai supplies Thai glyphs.
The name is capped at 48px with weight 600 and moderate tracking; section headings
are capped at 44px. Headings, body and captions use a restrained shared scale.
The footer name uses normal heading size. Thai text has extra line height for vowel marks.
Dates and technology names use the text face. Monospace is reserved for code.

## Layout

The shared page wrapper has fluid 20–32px padding and a 1280px maximum, including
padding. All major sections and the header share its left and right edges.
The opening has a compact identity/summary row above a larger image/story row.
Below 900px the image precedes its story; on phones the identity precedes the
summary and actions. Projects use one full-width
lead entry above two supporting entries; narrow layouts put each image above
its own description. Section headings and descriptions form one block above content.
About uses a pale education panel, experience uses one grouped reading area, Skills uses
one evidence panel beside a compact technology reference,
and contact uses a split form composition. Case studies share the 1280px page width.
Their header pairs the introduction with a single rounded proof area. The first
project metric leads at 48px; the remaining facts use smaller value/label rows.
Keep all facts without giving status, module counts and test files equal weight.
Overview is open text beside one neutral contribution panel.
The screenshot gallery follows that context, before features, which use plain
title/description rows. Tablet layouts stack narrative blocks; phones stack each
feature title above its description. Galleries retain their image borders and
use the wider content area. ERP workflow labels are shared with the home hero.
Images reserve their aspect ratio and show complete screenshots without cropping.

## Elevation & Depth

Use flat surface tones and space throughout the content. Actual form controls
keep visible boundaries. The user explicitly requested a clear-glass navbar:
the sticky header is the exception to the otherwise flat treatment. It uses a
68% white/dark tint, 20px backdrop blur, 140% saturation, a subtle transparent
edge, an inner highlight and a light floating shadow. The mobile menu shares
the header's glass surface. `--nav-glass-*` variables own its theme values.
Keep an opaque fallback when backdrop filters are unsupported or reduced
transparency is requested. Preserve text contrast, existing rounded controls,
header position and navigation behavior. Do not spread glass to content panels.

## Shapes

The user prefers rounded corners throughout. Controls and inputs use 10px,
media and project rows 16px, large panels 20px, and Skills chips a full pill.
The canonical `--corner-*` variables in `app/globals.css` map into Tailwind's
`rounded-md`, `rounded-lg` and `rounded-xl` utilities and shared component styles.
Clip images inside their rounded frames, including the hero panel and lightbox.
Full-width section backgrounds retain straight boundaries. Colour, layout and
native form/lightbox behavior remain unchanged by the corner treatment.

## Components

`Section`, `Projects`, `ProjectCaseStudy`, `ProjectImageFrame` and `TagList` are shared
owners. `ProjectGallery` has an optional single-image spotlight presentation while
retaining its native modal, arrow navigation and captions in the full gallery.
Case-study gallery images retain their intrinsic proportions with a neutral border
directly on each image, including the enlarged view. Phone screenshots have a
2px border following the rounded screen edges; browser captures use a 1px border
and the shared media radius. Keep padding outside the image boundary.
Featured project technology lists use three plain labels; Skills keeps every
technology, using neutral chips in the practice panel and plain text in the
supporting reference. Other projects uses compact neutral rounded
technology chips with a grey ground and body-colored text. Chips wrap naturally with an 8px gap and
remain static text labels. Case-study technology lists retain plain text.
Source notices remain visible.
The spotlight requests a 780px desktop image rather than stretching a thumbnail;
case-study image size hints follow the actual shared content width. The shared
image component maps its priority option to Next.js 16's current `preload` API.

### Foundational visual states

Use semantic links, inherited keyboard focus and existing hover styles. Navigation
must preserve the current language and role variant. Reduced-motion rules stay global.
Contact fields use one 2px blue focus stroke inset into the field boundary, with
no outer ring, gap or shadow. Hover only adjusts the neutral border. Keep focus
visible for both pointer and keyboard interaction without the global offset ring.

## Motion

Introduction elements arrive with short, staggered transform/opacity entrances;
the main screenshot has one quiet entrance. Screenshots respond subtly to hover.
Later sections remain fully visible while scrolling; do not repeat the same
fade on every card or section. Reduced motion removes travel and smooth scrolling.
Content does not require a JavaScript reveal hook. Avoid competing animated image runs.

## Content & Data Visualization

Describe the work plainly and separate personal contributions from team context.
FYT covers the React branch only. Its source stays private; the screenshot content
identifies its demo company and sample data. Keep those captions in the full gallery.

## Verification scope for this redesign

The initial edits followed the user's request not to run tests or build. The user
subsequently requested verification on 2026-10-15, authorizing the following checks:

- `npm run lint`: passed after excluding local `.agents/` tools and generated
  `.taste-skill/` reports from application linting. The initial failures were
  React Hook false positives inside the skill's own asset scripts.
- `tsc --noEmit --incremental false`: passed, including a run after the build.
- `npm run build`: passed with all 29 static pages generated. The sandbox's
  first attempt could not reach Google Fonts; a network-enabled rerun passed.
- Production HTTP checks: all 16 English/Thai home, case-study and DBA variant
  pages and nine document/metadata URLs returned HTTP 200.
- In-app browser checks: English and Thai layouts at phone, tablet and desktop
  widths (320, 390, 768 and 1440px sampled), with no horizontal overflow or
  headings exceeding two lines in the inspected pages.
- Confirmed alternating section grounds, rounded corners, backgrounds on all
  four Other projects entries, Skills chips and removal of the About statistics.
- Confirmed mobile menu navigation, light/dark switching, case-study language
  switching, gallery enlargement, next-image navigation, Escape dismissal and
  scroll unlock. Checked that the DBA page retains its own CV and project links.

The contact form was inspected without submitting an email. No end-to-end email
delivery test was performed. The taste inspector hit a headless CDP timeout;
visual and interaction checks used the in-app browser instead. Do not claim
automated taste-gate success or an aesthetic score. Verification screenshots
are saved in `.taste-skill/verified-skills-desktop.jpg` and
`.taste-skill/verified-skills-mobile.jpg`.

## Do's and Don'ts

The 2026-10-16 composition pass was visually inspected in the local dev browser:
English home at 1440/390px, Thai home at 320/390/768px, and sampled shared project
detail layouts. No horizontal overflow appeared in those views. No test suite,
type-check or build was run in that pass. Details and limitations are recorded in
`.taste-skill/polish-round-2.txt`; earlier verification above predates this pass.

The following refinement addressed the three remaining review findings: the
opening composition, repeated Skills boxes and equally weighted case metrics.
English desktop and Thai phone screenshots were inspected; sampled 320/390/768/
1440px layouts retained all 31 technologies without horizontal overflow. The
Cattle Passport's longer supporting values fit their labels at 390px, and the
DBA variant retained its reference-only Skills layout and separate resume.
No test suite, type-check or build was run for this refinement. See
`.taste-skill/refinement-report.txt` and the `refined-*` screenshots. Earlier
automated verification does not validate these later changes.

- Do keep both languages and sibling case studies consistent.
- Do identify conceptual diagrams as diagrams.
- Don't publish commercial code, credentials or customer records in this repository.
- Don't add metrics or accomplishments without supporting evidence.
