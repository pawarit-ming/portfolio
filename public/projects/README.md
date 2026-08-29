# Project screenshots

Drop screenshots here, one folder per project, named after the project slug:

```
public/projects/
  asset-management-system/
    cover.png
    registry.png
  thai-cattle-passport/
    cover.png
    identification.png
```

Then reference them from `lib/data.ts` by their path from the site root — note
there is no `public` in the path:

```ts
cover: {
  src: "/projects/asset-management-system/cover.png",
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

The gallery adapts to what it holds — `phone` shots go three across on desktop
and two on mobile, `screen` shots two across, since a dense table needs the width
to stay readable.

A project `cover` wants a landscape image. A portrait phone screenshot there
makes the card several times taller than its neighbour; for the cattle app the
cover is a composite of three phone screens on a transparent background, so it
sits on the frame colour in either theme.

## Practical notes

- **Format**: PNG or JPG. Next.js converts them to WebP on the fly, so do not
  bother pre-optimising.
- **Size**: around 1600px wide is plenty for a cover. Anything above ~2400px is
  wasted bytes in the repo.
- **`alt` text matters.** Describe what the screen shows, not the file. It is
  read aloud by screen readers and it is the one part of an image Google indexes.
  "The asset registry, listing tracked equipment with filters" — not "screenshot".
- **Check what is in the frame.** These screenshots go on a public site: no real
  names, ID numbers, phone numbers, internal URLs or live data in the shot. Use
  demo data, or blur it.
