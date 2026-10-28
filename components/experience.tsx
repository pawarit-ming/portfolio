import { Section, sectionLabel } from "@/components/section";
import type { Content } from "@/lib/content";

export function ExperienceSection({ content }: { content: Content }) {
  const { experience, ui } = content;
  return (
    <Section id="experience" title={ui.experience.title} label={sectionLabel(content, 3, "#experience")} description={ui.experience.description}>
      <ol className="experience-list">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`}>
            <div className="experience-meta">
              <p className="experience-period">{job.period}</p>
              <p className="experience-company">{job.company}</p>
            </div>
            <div className="experience-body">
              <h3>{job.role}</h3>
              <ul className="experience-highlights">
                {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
