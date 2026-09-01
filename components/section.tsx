import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /**
   * The small accent label above the heading.
   *
   * Optional: it exists to name the section when the heading itself is a phrase
   * — "Experience" over "Where I have worked". A section whose heading is
   * already the plain noun has nothing to put here, and repeating the word in
   * two sizes would only look like a mistake.
   */
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  /** Tints the section background to separate it from its neighbours. */
  tinted?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tinted = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={
        tinted
          ? "border-t border-line bg-surface"
          : "border-t border-line bg-card"
      }
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <header className="max-w-2xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={`${id}-heading`}
            className={`text-3xl font-semibold tracking-tight text-fg sm:text-4xl ${
              eyebrow ? "mt-3" : ""
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </header>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
