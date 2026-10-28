import { Section } from "@/components/section";
import type { Content } from "@/lib/content";

export function Skills({ content }: { content: Content }) {
  const { skillGroups, ui } = content;
  return (
    <Section id="skills" title={ui.skills.title} description={ui.skills.description}>
      <div className="skills-layout">
        <dl className="skills-reference">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <dt>{group.title}</dt>
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
