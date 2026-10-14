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
    fontFamily: "Geist, Noto Sans Thai, system-ui, sans-serif"
  mono:
    fontFamily: "Geist Mono, Noto Sans Thai, ui-monospace, monospace"
rounded:
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
spacing:
  case-study-max: "48rem"
  card-gap: "1.5rem"
omitted:
  - section: components
    reason: Shared component implementation is canonical; no generated component tokens.
---

# Pawarit Wang Portfolio Design System

## Overview

### Creative North Star

A technical project dossier: readable claims supported by diagrams, screenshots,
specific contributions, and links to evidence.

### Product context and register

- Audience: recruiters and engineering interviewers assessing junior web and mobile work.
- Register: content site; preserve the current identity rather than redesigning it for one project.
- Locales: English and Thai, with matching slugs and localized text and diagram labels.
- Usage: desktop review and phone browsing, with complete content available without hover.
- Signature: project-specific evidence, including a conceptual business workflow for FYT.
- Restraint: no invented customers, revenue, test results or claims of sole authorship.
- Anti-reference: generic marketing dashboards presented as real product screenshots.
- Token ownership: `app/globals.css` is canonical. Its CSS variables map through
  `@theme inline` into Tailwind utilities; this file documents the established system.

## Colors

Neutral surfaces and borders distinguish sections; blue denotes navigation.
Light values mirror the frontmatter. Dark equivalents live in `.dark` in
`app/globals.css`; illustrations have their own intentionally light canvas.

## Typography

Geist is the body and heading family, with Noto Sans Thai for Thai glyphs.
Geist Mono marks dates and utility labels. Long prose uses a 48rem content measure.

## Layout

Reuse the site header, sections and case-study component. Project cards stack on
phones, use two columns at the medium breakpoint and three at the large breakpoint.
Image frames reserve their aspect ratio and show complete diagrams or screenshots.

## Elevation & Depth

Use surface tones and one-pixel borders; retain the existing restrained depth.

## Shapes

Project cards use the existing 0.75rem radius; source notices use 0.5rem.

## Components

`Projects`, `ProjectCaseStudy`, `ProjectImageFrame` and `TagList` are shared owners.
Optional source notices and gallery headings preserve normal behavior for existing projects.

### Foundational visual states

Use semantic links, inherited keyboard focus and existing hover styles. Navigation
must preserve the current language and role variant. Reduced-motion rules stay global.

## Motion

Retain existing subtle link transitions and the stylesheet's reduced-motion behavior.

## Content & Data Visualization

Describe the work plainly and separate personal contributions from team context.
FYT covers the React branch only. Its source stays private; the public SVGs are
conceptual workflow diagrams with no production records or private code.

## Do's and Don'ts

- Do keep both languages and sibling case studies consistent.
- Do identify conceptual diagrams as diagrams.
- Don't publish commercial code, credentials or customer records in this repository.
- Don't add metrics or accomplishments without supporting evidence.
