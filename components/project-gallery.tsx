"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ProjectImageFrame } from "@/components/project-image";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";
import type { ProjectImage } from "@/lib/content";

type Labels = {
  closeImage: string;
  previousImage: string;
  nextImage: string;
  imageCounter: string;
};

/**
 * The case-study gallery: the grid of frames, and a lightbox that opens the
 * one clicked at full size.
 *
 * A native <dialog> opened with `showModal()` rather than a positioned div: it
 * brings Escape-to-close, the backdrop, inert page content and a focus trap
 * with it, all of which a hand-rolled overlay has to rebuild and usually gets
 * one of wrong.
 */
export function ProjectGallery({
  images,
  labels,
}: {
  images: ProjectImage[];
  labels: Labels;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const phoneGallery = images[0]?.aspect === "phone";
  const count = images.length;
  const current = open === null ? null : images[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  // Escape would close the dialog natively, behind React's back, and not every
  // browser follows its `cancel` with the `close` event that would let the
  // state catch up — Chromium in the Claude desktop app's pane does not, which
  // left the state on the last image and the page scroll-locked. So the native
  // close is cancelled and the state does it instead; the effect above then
  // closes the dialog. `close` is still heard for any other way it shuts.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const cancel = (event: Event) => {
      event.preventDefault();
      setOpen(null);
    };
    const reset = () => setOpen(null);
    dialog.addEventListener("cancel", cancel);
    dialog.addEventListener("close", reset);
    return () => {
      dialog.removeEventListener("cancel", cancel);
      dialog.removeEventListener("close", reset);
    };
  }, []);

  // A modal dialog does not stop the page behind it scrolling under a wheel or
  // a swipe, which leaves the reader somewhere else when they close it.
  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const step = (by: number) =>
    setOpen((index) => (index === null ? null : (index + by + count) % count));

  // A click anywhere on the dark surround closes it — anything but the image,
  // the caption or a control. Checked by what was hit rather than by which
  // wrapper caught it, since the surround is several nested boxes.
  const closeOnSurround = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("img, button, p")) setOpen(null);
  };

  return (
    <>
      {/* Phone shots sit six across on a wide screen, so the set reads as one
          row and each opens full size on a click; three across on a tablet,
          two on a phone. Browser screenshots need the extra width to stay
          readable, and the first of them leads at full width. */}
      <div
        className={
          phoneGallery
            ? "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            : "mt-6 grid gap-5 sm:grid-cols-2"
        }
      >
        {images.map((image, index) => {
          const lead = !phoneGallery && index === 0;
          return (
            <ProjectImageFrame
              key={image.src}
              image={image}
              bordered
              className={lead ? "sm:col-span-2" : undefined}
              sizes={
                phoneGallery
                  ? "(min-width: 1280px) 190px, (min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  : lead
                    ? "(min-width: 1280px) 1216px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                    : "(min-width: 1280px) 598px, (min-width: 640px) 50vw, 100vw"
              }
              frameClassName="gallery-frame"
              onOpen={() => setOpen(index)}
            />
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        onClick={closeOnSurround}
        onKeyDown={(event) => {
          if (count < 2) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        aria-label={current?.caption ?? current?.alt}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/90 p-0 text-white backdrop:bg-black/60"
      >
        {current && open !== null ? (
          <div className="flex h-full flex-col px-4 py-4 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-white/70">
                {labels.imageCounter
                  .replace("{current}", String(open + 1))
                  .replace("{total}", String(count))}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={labels.closeImage}
                // First focusable element, so showModal() lands focus here.
                autoFocus
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center">
              {/* A plain <img>, not next/image: `fill` stretches the element
                  over the whole area, so a click on the dark bars beside a
                  wide screenshot would land on the image and not close. Sized
                  this way the element is exactly the picture. It also wants the
                  original file here, not a resized copy. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                className={`gallery-lightbox-image max-h-full max-w-full object-contain${current.aspect === "phone" ? " gallery-image-phone" : ""}`}
              />

              {count > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={labels.previousImage}
                    className="absolute left-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={labels.nextImage}
                    className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>

            {current.caption ? (
              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-snug text-white/80">
                {current.caption}
              </p>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
