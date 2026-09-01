import { Section } from "@/components/section";
import type { Content } from "@/lib/content";

export function Skills({ content }: { content: Content }) {
  const { skillGroups, ui } = content;

  return (
    <Section
      id="skills"
      eyebrow={ui.skills.eyebrow}
      title={ui.skills.title}
      description={ui.skills.description}
      tinted
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="bg-card p-6">
            <h3 className="text-sm font-semibold text-fg">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
