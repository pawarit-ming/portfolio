# Project screenshots

Drop screenshots here, one folder per project, named after the project slug:

```
public/projects/
  asset-management-system/
    cover.webp
    registry.webp
  thai-cattle-passport/
    cover.webp
    identification.webp
```

Then reference them from `lib/content/en.ts` and `th.ts` by their path from the site root — note
there is no `public` in the path:

```ts
cover: {
  src: "/projects/asset-management-system/cover.webp",
  alt: "The asset registry, listing tracked equipment with filters",
  aspect: "wide",
},
```

## Picking `aspect`

| Value    | Frame | Fit     | Use for                                      |
| -------- | ----- | ------- | -------------------------------------------- |
| `screen` | 16:10 | contain | Browser screenshots, shown uncropped         |
| `phone`  | 9:19  | contain | Portrait mobile screenshots, shown uncropped |
| `wide`   | 16:10 | cover   | Photos, cropped to fill (default)            |
| `tall`   | 3:4   | cover   | Long full-page screenshots                   |
| `square` | 1:1   | cover   | Logos, diagrams                              |

Use `screen` or `phone` for anything that is a screenshot: cropping one costs you
a sidebar or a toolbar, and the layout is the thing worth looking at. `wide`,
`tall` and `square` crop to fill, which suits photographs.

The gallery adapts to what it holds — `phone` shots go six across on desktop,
three on a tablet and two on a phone, `screen` shots two across, since a dense
table needs the width to stay readable.

A project `cover` wants a landscape image. A portrait phone screenshot there
makes the card several times taller than its neighbour; for the cattle app the
cover is a composite of three phone screens on a transparent background, so it
sits on the frame colour in either theme.

## Practical notes

- **Format**: WebP, at the original resolution. The lightbox serves the file
  as it is, so its weight is what a visitor downloads when they open a shot.
  Save browser screenshots lossless (no pixel changes, and usually smaller than
  the PNG); save phone screens with photographs in them at quality 90, which
  looks the same and is a fraction of the size. Next.js still resizes them for
  the cards.
- **Size**: around 1600px wide is plenty for a cover. Anything above ~2400px is
  wasted bytes in the repo.
- **`alt` text matters.** Describe what the screen shows, not the file. It is
  read aloud by screen readers and it is the one part of an image Google indexes.
  "The asset registry, listing tracked equipment with filters" — not "screenshot".
- **Check what is in the frame.** These screenshots go on a public site: no real
  names, ID numbers, phone numbers, internal URLs or live data in the shot. Use
  demo data, or blur it.
