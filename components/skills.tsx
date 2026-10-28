import { Section, sectionLabel } from "@/components/section";
import type { Content } from "@/lib/content";

export function Skills({ content }: { content: Content }) {
  const { skillGroups, ui } = content;
  return (
    <Section id="skills" title={ui.skills.title} label={sectionLabel(content, 4, "#skills")} description={ui.skills.description}>
      <div className="skills-layout">
        <dl className="skills-reference">
          {skillGroups.map((group, index) => (
            <div key={group.title}>
              <dt>
                <span className="skill-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {group.title}
              </dt>
              <dd>
                <ul className="skill-items" role="list">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
