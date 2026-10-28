# Project screenshots

One folder per project, named after its slug. Each file here must be listed in
the project's `screens` in `lib/content/en.ts` and `th.ts` (path from the site
root, no `public`), and imported in `components/projects.tsx`:

```ts
screens: [
  { src: "/projects/asset-management-system/registration-wizard.webp",
    alt: "Step one of the asset registration wizard, with a progress bar",
    aspect: "screen" },
],
```

- `screen`: a browser screenshot. One per card; it fills the card width and is
  cropped at the bottom, so keep the important part near the top.
- `phone`: a portrait mobile screenshot. Three side by side.

Export as WebP. Screens should come from demo data: no real customer, name or
phone number belongs in a public screenshot.
