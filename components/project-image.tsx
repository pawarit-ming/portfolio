import Image from "next/image";
import type { ProjectImage as ProjectImageData } from "@/lib/data";

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
};

export function ProjectImageFrame({
  image,
  sizes,
  priority = false,
  className = "",
  frameClassName = "",
}: ProjectImageProps) {
  const aspect = image.aspect ?? "wide";
  // A screenshot has to be shown whole — a crop loses a sidebar or a toolbar,
  // and the layout is the thing worth looking at. Photos may crop to fill.
  const uncropped = aspect === "phone" || aspect === "screen";

  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden bg-frame ${aspectClass[aspect]} ${frameClassName}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          // `fill` ignores container padding, so the inset goes on the image.
          className={
            uncropped
              ? `object-contain ${aspect === "phone" ? "p-4" : "p-2"}`
              : "object-cover"
          }
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-2 text-xs leading-snug text-subtle">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
