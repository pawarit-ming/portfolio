import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
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
