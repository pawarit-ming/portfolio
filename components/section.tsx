import type { ReactNode } from "react";
import type { Content } from "@/lib/content";

type SectionProps = {
  id: string;
  title: string;
  /** The small numbered line above the heading, e.g. "02 / Projects". */
  label?: string;
  description?: string;
  children: ReactNode;
  tinted?: boolean;
};

/** "02 / Projects": the section's place on the page and its name in the menu. */
export function sectionLabel(content: Content, index: number, hash: string) {
  const name = content.navigation.find((item) => item.hash === hash)?.label ?? content.ui.getInTouch;
  return `${String(index).padStart(2, "0")} / ${name}`;
}

export function Section({ id, title, label, description, children, tinted = false }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}
      className={`portfolio-section${tinted ? " section-tinted" : ""}`}>
      <div className="page-wrap">
        <header className="section-introduction">
          <div>
            {label ? <p className="section-label">{label}</p> : null}
            <h2 id={`${id}-heading`}>{title}</h2>
          </div>
          {description ? <p>{description}</p> : null}
        </header>
        <div className="section-content">{children}</div>
      </div>
    </section>
  );
}
