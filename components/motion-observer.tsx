"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * What enters, and how. "rise" lifts a block in, "row" walks a list in row by
 * row, "mask" opens a picture from its top edge. Siblings matched by the same
 * selector stagger in reading order.
 */
const CHOREOGRAPHY: [selector: string, kind: "rise" | "row" | "mask"][] = [
  [".section-introduction > div, .section-introduction > p", "rise"],
  [".project-preview", "mask"],
  [".project-information > *", "rise"],
  [".other-work > h3", "rise"],
  [".other-work-entry", "row"],
  [".certifications li", "row"],
  [".about-column", "rise"],
  [".experience-list > li", "row"],
  [".skills-reference > div", "row"],
  [".contact-information, .contact-form-panel", "rise"],
  [".footer-top", "rise"],
  // Case studies: screens first, then the story, features and the way on.
  [".case-study-section > h2, .case-study-prose", "rise"],
  [".case-study-screens > div > *", "row"],
  [".case-study-features > div", "row"],
  [".case-study-next-heading", "rise"],
  [".case-study-next > li", "row"],
  [".case-study-cta", "rise"],
];

const MAX_STEP = 4;

/**
 * Section entrances. Only what is still below the fold when the page mounts is
 * hidden, so nothing visible blinks out, and without script (or with reduced
 * motion) every block simply stays where it is.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const settle = (el: HTMLElement) => {
      el.classList.remove("is-pending");
      // Once in, hand the element back to its own hover transitions.
      const step = Number(el.style.getPropertyValue("--i")) || 0;
      timers.push(window.setTimeout(() => {
        delete el.dataset.reveal;
        el.style.removeProperty("--i");
      }, 1100 + step * 60));
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        settle(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    // The root reaches far above the viewport, so anything scrolled past
    // between two frames (a fast flick) still counts as seen and comes in.
    }, { rootMargin: "100000px 0px -4% 0px", threshold: 0 });

    const pending: HTMLElement[] = [];
    for (const [selector, kind] of CHOREOGRAPHY) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (el.dataset.reveal || el.closest(".portfolio-hero")) return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const siblings = el.parentElement
          ? [...el.parentElement.children].filter((child) => child.matches(selector))
          : [el];
        el.dataset.reveal = kind;
        el.style.setProperty("--i", String(Math.min(siblings.indexOf(el), MAX_STEP)));
        el.classList.add("is-pending");
        pending.push(el);
        io.observe(el);
      });
    }

    return () => {
      io.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      pending.forEach((el) => {
        el.classList.remove("is-pending");
        delete el.dataset.reveal;
        el.style.removeProperty("--i");
      });
    };
  }, [pathname]);

  return null;
}
