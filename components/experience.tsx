import Link from "next/link";
import { Section, sectionLabel } from "@/components/section";
import { ArrowRightIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ExperienceSection({ locale, basePath = "", content }: {
  locale: Locale;
  basePath?: string;
  content: Content;
}) {
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
              {job.projectSlug ? (
                <div className="experience-footer">
                  <Link className="text-action experience-case-link"
                    href={localePath(locale, `${basePath}/projects/${job.projectSlug}`)}>
                    {ui.experience.readCaseStudy}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
