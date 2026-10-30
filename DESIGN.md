---
version: beta
name: Pawarit Wang Portfolio
description: A bilingual one-page developer portfolio, editorial in style, with project cards instead of case studies.
colors:
  primary: "#2d4bff"
  background: "#f5f4f0"
  surface: "#efeee9"
  card: "#fbfaf7"
  frame: "#ebe9e3"
  well: "#e2e0d9"
  foreground: "#141414"
  muted: "#5c5b57"
  line: "#cfccc4"
  dark-band: "#1c1c1c"
typography:
  sans:
    fontFamily: "Manrope, Noto Sans Thai, system-ui, sans-serif"
  scale:
    name: "clamp(3.25rem, 11vw, 11rem)"
    section: "clamp(2.25rem, 1.5rem + 3.2vw, 4.5rem)"
    statement: "clamp(1.375rem, 1rem + 1.2vw, 2.125rem)"
    lead: "clamp(1.375rem, 1.1rem + 0.7vw, 1.75rem)"
    body: "1rem"
    small: "0.875rem"
    label: "0.8125rem"
rounded:
  control: "0.25rem"
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

A junior full-stack and mobile developer's portfolio for recruiters, in English
and Thai with matching URLs. It is one page: recruiters scan, so there are no
project detail pages, and every section says only what no other section says.
The look follows a reference the user chose: a warm off-white ground, very large
heavy type, small numbered uppercase labels, thin rules, and two full fields of
colour near the end.

## Rules

- Headlines run two lines or fewer at every width.
- One accent, the blue. It marks the primary action (View projects, Send
  message), the full stop after the name, the section numbers and the
  availability dot. Text links are underlined in the ink colour.
- No gradients, and no shadows on anything at rest. The sticky header is the one
  exception (see Elevation).
- Stacks read as a line of names with ` · ` between them, never as chips.
- Copy stays short. If a fact appears in one section, it does not appear in
  another.

The taste skill in `.claude/skills/taste-skill` is still used for its checks
(overflow, contrast, screenshots). Its bans on eyebrows, index numbers,
uppercase labels and hairlines do not apply here: those are the reference style
the user asked for, so its inspector reports them and they are left as they are.

## Colours

Off-white ground and near-black ink, with warm grey tone steps and one blue.
`--frame` is the tinted section ground (About), `--card` the lighter surface for
the contact form, and `--work-1..3` the three pale tints behind the project
screenshots (cool grey, sand, sage), taken in turn. Skills sits on a near-black
band and Contact on a band of the accent; each redefines `--fg`, `--muted` and
`--line-strong` locally so the shared components read correctly on it. Running
text is in the full ink; grey is for dates, labels and secondary notes. Dark
equivalents live in `.dark`, with a lighter blue (`#7f93ff`) as the accent.

## Typography

Manrope for Latin, Noto Sans Thai for Thai glyphs. Display and section headings
are weight 800 with tight tracking; the name ends in a blue full stop. Labels
(the hero's top line, section numbers, menu links, dates, the stack line under
each project) are 13px, weight 600, uppercase, tracked 0.08em, in the same
family. There is no monospace and no second family. Thai headings get extra line
height for vowel and tone marks, and the name's mask leaves room below the
baseline so descenders are not clipped.

## Layout

One page wrapper: 1280px maximum, fluid 20–32px side margins, shared by the
header and every section. Section headings sit on a two-column grid: the
numbered label and the heading on the left, the one-sentence intro on the right.

### Top to bottom

- **Header**: a clear-glass sticky bar (see Elevation). Wordmark (PW monogram
  and name), then Projects, About, Experience, Skills as uppercase labels,
  language and theme switches, and Get in touch.
- **Hero**: type alone, no picture. The role as a label, the name at full size
  with its blue full stop, the statement at statement size, then a footer row:
  availability (blue dot) and the relocation line, the social links, and the
  Resume and View projects actions. No address anywhere on the site. A thin
  rule closes the hero.
- **01 / Projects**: each project is a full-width panel on its own tint. Its
  headline figure sits at the top left; below it, the screenshots run in a strip
  that scrolls sideways (swipe, trackpad, or the two round buttons, one picture
  per press) and opens full size in a `<dialog>` viewer. Under the panel:
  `/01`, the title, the tagline, a round GitHub button when the repository is
  public, then the stack and the kind of work with its organisation and period
  as a label row. Thin rules separate the projects. Other projects follow as
  one-line rows (title and date, a short description, the stack), with a rule
  above.
- **02 / About** (tinted): the summary as the section intro, then three ruled
  columns: Education (with the transcript), Certifications, Languages.
- **03 / Experience**: the two internships, unboxed, a date and company column
  beside the role and contribution.
- **04 / Skills** (near-black band): a three-by-two ruled grid, each group with
  its number, its name at heading size, and its tools as one uppercase line.
- **05 / Get in touch** (accent band): details and social links on the left, the
  form on a card on the right.
- **Footer**: monogram, name and role, navigation with a Contact link, then the resume and socials. No email: the Contact section right above already shows it.

Old `/projects/<slug>` links redirect to `#projects` (`next.config.ts`), and a
page opened at any `#section` scrolls to it once the router has loaded.

### 404 and Open Graph

The 404 page sits on the page wrapper: `404` at display size, the title, one
sentence and the back action. The Open Graph card mirrors the hero: the name in
Manrope 800 with its blue full stop, the statement under it, the role as a
label along the bottom, on the off-white ground (Noto Sans Thai for the Thai
card).

## Elevation

Everything is flat except the sticky header, which the user explicitly asked to
be clear glass: an 82% ground tint, 20px backdrop blur at 140% saturation, a
faint bottom edge, an inner highlight and a light floating shadow. The mobile
menu shares it. `--nav-glass-*` variables hold the values for both themes, and
it falls back to an opaque bar when backdrop filters are unsupported or reduced
transparency is requested. Do not spread the glass to any content panel.

## Shapes

4px corners on controls and inputs, 16px on media, 20px on panels and project
tints. Round buttons (the strip controls, the GitHub button) are full circles.
Full-width section bands keep straight edges.

## Motion

- The name rises from behind its baseline; the statement and the footer row
  follow in a short stagger.
- Below the fold, `components/motion-observer.tsx` walks each section in reading
  order: blocks rise, list rows enter one by one, project panels open from their
  top edge. 450–700ms, once. Only what is below the fold at mount is hidden, so
  nothing visible blinks and no content depends on the script.
- The screenshot strip scrolls smoothly and snaps to each picture; the viewer
  fades each picture in.
- Under the hand: underlines darken, arrows nudge, buttons press, screenshots
  lift slightly.
- `prefers-reduced-motion: reduce` keeps every block in place and makes every
  scroll instant.

## Content

- Describe the work plainly and separate personal contributions from team
  context. No invented customers or figures. Sole authorship is claimed only
  where the user has confirmed it: the FYT Trading ERP, which they built alone.
- The FYT Trading ERP is a personal project, in use and still in development.
  It is not work experience and it is never described as a family business.
  Its screenshots show the demo company and sample data; its source stays
  private.
- Figures on the site match the CV and were measured from git; keep them in step.
- English and Thai stay in step: the same sections, facts and figures.

## Process

- The user usually wants edits only. Build, test or inspect only when asked.
- Commits carry no Claude co-author line.
- The taste skill has one source: `.claude/skills/taste-skill`, read by Claude
  Code. `.agents/skills/taste-skill` is a copy for Codex. Update the skill
  there first, then copy the folder over the Codex one so both read the same
  version. (A symlink would remove the copy, but on Windows it needs Developer
  Mode and breaks on a clone without symlink support.)
- Interactive demos were tried and removed: an ordinary business rule shown as a
  feature read as filler. Add one only for something the user considers special.
