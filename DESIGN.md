---
version: beta
name: Pawarit Wang Portfolio
description: A bilingual developer portfolio with evidence-based project case studies.
colors:
  primary: "#1d4ed8"
  background: "#ffffff"
  surface: "#fafafa"
  frame: "#f4f4f5"
  well: "#e9e9ec"
  foreground: "#18181b"
  field-border: "#d4d4d8"
typography:
  sans:
    fontFamily: "Schibsted Grotesk, Noto Sans Thai, system-ui, sans-serif"
  scale:
    display: "clamp(2.75rem, 11.5vw, 10.5rem)"
    title: "clamp(2.75rem, 6vw, 5.5rem)"
    head: "clamp(2rem, 1.65rem + 1.4vw, 2.75rem)"
    lead: "clamp(1.375rem, 1.1rem + 0.7vw, 1.75rem)"
    body: "1rem"
    small: "0.875rem"
rounded:
  control: "0.625rem"
  media: "1rem"
  panel: "1.25rem"
spacing:
  page-max: "1280px"
  margin: "clamp(1.25rem, 3vw, 2rem)"
omitted:
  - section: components
    reason: Shared component implementation is canonical; no generated component tokens.
---

# Pawarit Wang Portfolio Design System

`app/globals.css` is canonical. Its custom properties map through `@theme inline`
into Tailwind utilities; this file explains the decisions behind them. When the
two disagree, the CSS wins and this file should be corrected.

## Overview

A junior web and mobile developer's portfolio for recruiters and engineering
interviewers, in English and Thai with matching URLs. The page leads with the
person, then the work, then the record. Design work follows the taste skill in
`.claude/skills/taste-skill` (mirrored in `.agents/skills/taste-skill` for
Codex): its house rules below are binding on every page, including case
studies, the 404 page and the Open Graph cards.

## House rules

- Headlines run two lines or fewer at every width.
- No eyebrows: no small label above a heading.
- No monospace outside real code.
- No thin rules or 1px outlined boxes. Real form fields keep their borders.
- No gradients, no glass or backdrop blur, no shadows on anything at rest.
  One exception, at the user's request: the sticky header (see Elevation).
- No chips or pills for technologies or roles: stacks read as a sentence with
  ` · ` between names, and a name never breaks inside itself.
- No icon-topped cards and no rows of identical boxed cards.
- Five type sizes on a page at most: display or title, head, lead, body, small.
- The blue accent marks primary actions only (View projects, Send message,
  Get in touch on case studies). Text links are underlined in the ink colour.
- Separate surfaces by a step in tone, never by a line or a shadow.

## Colours

White ground, near-black ink, neutral grey tone steps, one blue. The page
alternates grounds so no two neighbouring sections share one: Hero white, About
grey, Projects white, Experience grey, Skills white, Contact grey, Footer white.
`--frame` is the grey section ground; `--well` sits behind screenshots so a white
interface still reads as a picture; `--card` is the white surface used on grey.
Running text is in the full ink; grey is for dates, captions and secondary
notes. Dark equivalents live in `.dark`. Keep the existing white, grey and blue
palette unless the user asks otherwise; a green palette was rejected before.

## Typography

Schibsted Grotesk for Latin, Noto Sans Thai for Thai glyphs, weight 600 for
display and headings. The name on the homepage and the 404 code use the display
step; case-study titles use the title step. Both rise out of their own baseline
on load. Thai headings get extra line height for vowel and tone marks.

## Layout

One page wrapper: 1280px maximum, fluid 20–32px side margins, shared by the
header and every section. Gaps between sections are clearly larger than gaps
inside them.

### Homepage, top to bottom

- **Header**: a clear-glass sticky bar (see Elevation). Wordmark (PW monogram
  and name), About, Projects, Experience, Skills, language and theme switches,
  Get in touch.
- **Hero**: everything on one left edge. The name at display size; one line of
  facts under it (the role in the ink at body size, then location and
  availability in grey); the statement at lead size; the View projects and
  Resume actions; the social links. No picture and no side column: a facts
  block parked on the right read as stranded.
- **About** (grey): summary, certificates and languages on the left; the
  education panel in white on the right.
- **Things I have built** (white): a one-sentence intro, the FYT ERP as a wide
  entry with its screenshot on the well, then two supporting projects side by
  side. Each entry: title, kind and period, tagline, its lifecycle chain
  (for example Registration → Borrowing → Inspection → Disposal), two figures,
  the stack line and an underlined case-study link. Then Other projects as an
  index set in large type, unboxed; hovering one row dims the rest.
- **Experience** (grey): the two internships, unboxed, a date and company column
  beside the role and contribution.
- **Skills** (white): one tone panel for the evidenced groups with links to the
  projects behind them, beside a plain reference list.
- **Contact** (grey): details, roles and links on the left; the form on a white
  panel on the right.
- **Footer** (white): monogram, name, role and email, navigation and socials.
  The name is not repeated at display size; the user removed that.

### Case study, top to bottom

- **Header** (grey): back link, title, the tagline at lead size, one line of
  kind and period, then the figures in an unboxed row. Nothing else: the chain,
  the source notice and the stack live in the body.
- **Screens** first: a browser screenshot leads at full width with the rest two
  across; phone screenshots sit six across on desktop, three on a tablet, two
  on a phone. Every frame opens in the native lightbox.
- **Overview** beside **What I did**: overview prose with the lifecycle chain
  and source notice under it; the contribution list in a grey panel ending with
  the full stack line.
- **Key features** as a list in large type: the name at lead size, the line
  explaining it beside.
- **Footer** (grey): the other case studies as an index in large type, then the
  Get in touch action.

### 404 and Open Graph

The 404 page sits on the page wrapper: `404` at display size, the title at lead
size, one sentence and the back action. The Open Graph cards mirror the hero
and the case-study header: name (132px) or project title (88px), the statement
under it, role and location or kind and name along the bottom, in Schibsted
Grotesk (Noto Sans Thai for Thai), white ground, no chips.

## Elevation

Everything is flat except the sticky header, which the user explicitly asked to
be clear glass: a 68% white (or near-black) tint, 20px backdrop blur at 140%
saturation, a faint bottom edge, an inner highlight and a light floating
shadow. The mobile menu shares the same glass. `--nav-glass-*` variables hold
the values for both themes. It falls back to an opaque bar when backdrop
filters are unsupported or reduced transparency is requested. Do not spread the
glass to any content panel; the header lines carry `taste-skill-ignore` so the
lint passes on this one deliberate exception.

## Shapes

Rounded corners stay: 10px on controls and inputs, 16px on media, 20px on large
panels and screenshot wells. Full-width section grounds keep straight edges.

## Motion

- The hero name and case-study titles rise from behind their baseline; the hero
  copy follows in a short stagger.
- Below the fold, `components/motion-observer.tsx` walks each section in reading
  order: blocks rise, list rows enter one by one, screenshots open from their
  top edge inside their well. 450–700ms, 45–60ms between siblings, once. Only
  what is below the fold at mount is hidden, so nothing visible blinks and no
  content depends on the script.
- Under the hand: underlines darken, arrows nudge, buttons press, index rows dim
  their neighbours.
- `prefers-reduced-motion: reduce` keeps every block in place.

## Content

- Describe the work plainly and separate personal contributions from team
  context. No invented customers, figures or claims of sole authorship.
- The FYT Trading ERP is a personal project, in use and still in development.
  It is not work experience and it is never described as a family business.
- FYT screenshots show the demo company and sample data, and say so in their
  captions. Its source stays private.
- English and Thai stay in step: the same sections, facts and figures.

## Process

- The user usually wants edits only. Build, test or inspect only when asked.
- The taste skill has one source: `.claude/skills/taste-skill`, read by Claude
  Code. `.agents/skills/taste-skill` is a copy for Codex. Update the skill
  there first, then copy the folder over the Codex one so both read the same
  version. (A symlink would remove the copy, but on Windows it needs Developer
  Mode and breaks on a clone without symlink support.)
- Interactive demos were tried and removed: an ordinary business rule shown as a
  feature read as filler. Add one only for something the user considers special.
