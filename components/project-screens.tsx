"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";
import type { ProjectScreen, UiCopy } from "@/lib/content/types";

type Screen = ProjectScreen & { image: StaticImageData };

/**
 * A project's screenshots as a strip that scrolls sideways (swipe, trackpad or
 * the two buttons), each one opening full size in a viewer.
 *
 * The viewer is a native <dialog> opened with `showModal()`: Escape, the
 * backdrop, inert page content and a focus trap come with it.
 */
export function ProjectScreens({ screens, labels }: {
  screens: Screen[];
  labels: UiCopy["projects"]["screens"];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const phones = screens.every((screen) => screen.aspect === "phone");
  const count = screens.length;
  const current = open === null ? null : screens[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  // Escape closes a dialog behind React's back, and Chromium in the Claude
  // desktop app's pane does not follow `cancel` with `close`, which left the
  // state stuck open and the page scroll-locked. So the state closes it.
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

  // A modal dialog does not stop the page behind it scrolling under a wheel.
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
  // One picture per press, so the strip glides to the next one and stops on it.
  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    const slide = track?.firstElementChild as HTMLElement | null;
    if (!track || !slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (slide.offsetWidth + gap) });
  };
  // A click on the dark surround closes the viewer; the image and controls do not.
  const closeOnSurround = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest("img, button")) setOpen(null);
  };

  return (
    <>
      <div ref={trackRef} className={`screen-track${phones ? " screen-track-phones" : ""}`}>
        {screens.map((screen, index) => (
          <button key={screen.src} type="button" className="screen-slide" onClick={() => setOpen(index)}>
            <Image
              src={screen.image}
              alt={screen.alt}
              sizes={phones ? "(min-width: 900px) 200px, 40vw" : "(min-width: 1280px) 960px, 85vw"}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              className={phones ? "project-phone-image" : "project-preview-image"}
            />
          </button>
        ))}
      </div>
      {count > 1 ? (
        <div className="screen-controls">
          <button type="button" onClick={() => scroll(-1)} aria-label={labels.previous}>
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={labels.next}>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        onClick={closeOnSurround}
        onKeyDown={(event) => {
          if (count < 2) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        aria-label={current?.alt}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/90 p-0 text-white backdrop:bg-black/60"
      >
        {current && open !== null ? (
          <div className="flex h-full flex-col px-4 py-4 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-white/70">
                {labels.counter.replace("{current}", String(open + 1)).replace("{total}", String(count))}
              </p>
              <button type="button" onClick={() => setOpen(null)} aria-label={labels.close} autoFocus
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center">
              {/* A plain <img> sized to the picture, so a click on the bars beside it
                  closes rather than landing on the image; and the original file. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={current.src} src={current.src} alt={current.alt}
                className={`screen-viewer-image max-h-full max-w-full object-contain${phones ? " screen-viewer-phone" : ""}`} />
              {count > 1 ? (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label={labels.previous}
                    className="absolute left-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80">
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label={labels.next}
                    className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80">
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
