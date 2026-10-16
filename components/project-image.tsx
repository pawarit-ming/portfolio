import Image from "next/image";
import { projectImageAssets } from "@/lib/project-image-assets";
import type { ProjectImage as ProjectImageData } from "@/lib/content";

const aspectClass = {
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
  // Browser screenshots arrive at whatever the window was — 1.5 to 2.0 here —
  // so they sit whole in a 16:10 frame rather than losing a sidebar to a crop.
  screen: "aspect-[16/10]",
  // A portrait frame roughly the shape of a handset. A landscape one would
  // letterbox a 9:20 screenshot down to a sliver.
  phone: "aspect-[9/19]",
} as const;

type ProjectImageProps = {
  image: ProjectImageData;
  /** Matches the CSS width of the frame, so the browser fetches a sane size. */
  sizes: string;
  /** Set on the first image above the fold. */
  priority?: boolean;
  /** Layout classes for the figure — margins, grid placement. */
  className?: string;
  /** Classes for the image frame itself — borders, rounding. */
  frameClassName?: string;
  /** Border the actual screenshot using its intrinsic proportions. */
  bordered?: boolean;
  /**
   * Makes the frame a button that opens the image full size. Only a client
   * component can pass one, which is why the gallery is one and the homepage
   * cards — whose whole card is already a link — are not.
   */
  onOpen?: () => void;
};

export function ProjectImageFrame({
  image,
  sizes,
  priority = false,
  className = "",
  frameClassName = "",
  bordered = false,
  onOpen,
}: ProjectImageProps) {
  const aspect = image.aspect ?? "wide";
  // A screenshot has to be shown whole — a crop loses a sidebar or a toolbar,
  // and the layout is the thing worth looking at. Photos may crop to fill.
  const uncropped = aspect === "phone" || aspect === "screen";
  const intrinsicImage = bordered ? projectImageAssets[image.src] : undefined;
  const frameClasses = `relative block w-full overflow-hidden rounded-lg bg-frame ${intrinsicImage ? "image-frame-natural" : aspectClass[aspect]} ${frameClassName}`;

  const picture = (
    <Image
      src={intrinsicImage ?? image.src}
      alt={image.alt}
      fill={intrinsicImage ? undefined : true}
      sizes={sizes}
      preload={priority}
      // `fill` ignores container padding, so the inset goes on the image.
      className={
        intrinsicImage
          ? `gallery-image${aspect === "phone" ? " gallery-image-phone" : ""}`
          : uncropped
          ? `object-contain screenshot-outline ${aspect === "phone" ? "p-4" : "p-2"}`
          : "object-cover"
      }
    />
  );

  return (
    <figure className={className}>
      {onOpen ? (
        // The image's alt text is the button's name, so a screen reader hears
        // what it opens rather than a bare "button".
        <button
          type="button"
          onClick={onOpen}
          className={`${frameClasses} cursor-zoom-in transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
        >
          {picture}
        </button>
      ) : (
        <div className={frameClasses}>{picture}</div>
      )}
      {image.caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
