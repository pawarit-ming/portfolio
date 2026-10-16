import type { ReactNode } from "react";

export function Tag({ children, tone = "default" }: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return <span className={`technology-tag${tone === "accent" ? " technology-accent" : ""}`}>{children}</span>;
}

export function TagList({ items, tone = "default" }: {
  items: string[];
  tone?: "default" | "accent";
}) {
  return <ul className="technology-list">{items.map((item) => (
    <li key={item}><Tag tone={tone}>{item}</Tag></li>
  ))}</ul>;
}
