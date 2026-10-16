import Link from "next/link";
import { Section } from "@/components/section";
import { ArrowRightIcon } from "@/components/icons";
import type { Content, SkillGroup } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

export function Skills({ content, locale, basePath = "" }: { content: Content; locale: Locale; basePath?: string }) {
  const { skillGroups, projects, ui } = content;
  const evidencedGroups = skillGroups.filter((group) => group.projects?.length);
  const referenceGroups = skillGroups.filter((group) => !group.projects?.length);
  const renderGroup = (group: SkillGroup) => (
    <div key={group.title}>
      <dt>{group.title}</dt>
      <dd>
        <ul className="skill-items" role="list">
          {group.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {group.note ? <p className="skill-note">{group.note}</p> : null}
        {group.projects?.length ? (
          <ul className="skill-evidence">
            {group.projects.map((slug) => {
              const project = projects.find((item) => item.slug === slug);
              return project ? (
                <li key={slug}>
                  <Link href={localePath(locale, `${basePath}/projects/${slug}`)}>
                    {project.title}<ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        ) : null}
      </dd>
    </div>
  );
  return (
    <Section id="skills" title={ui.skills.title} description={ui.skills.description}>
      <div className={`skills-layout${evidencedGroups.length ? "" : " skills-layout-reference"}`}>
        {evidencedGroups.length ? <dl className="skills-practice">{evidencedGroups.map(renderGroup)}</dl> : null}
        <dl className="skills-reference">{referenceGroups.map(renderGroup)}</dl>
      </div>
    </Section>
  );
}
