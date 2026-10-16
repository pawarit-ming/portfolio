import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** Kept compatible with callers; headings now carry the section name. */
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tinted?: boolean;
};

export function Section({ id, title, description, children, tinted = false }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}
      className={`portfolio-section${tinted ? " section-tinted" : ""}`}>
      <div className="page-wrap">
        <header className="section-introduction">
          <h2 id={`${id}-heading`}>{title}</h2>
          {description ? <p>{description}</p> : null}
        </header>
        <div className="section-content">{children}</div>
      </div>
    </section>
  );
}
