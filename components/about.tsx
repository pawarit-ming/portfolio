import { Section } from "@/components/section";
import { DocumentIcon, ExternalLinkIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { documents } from "@/lib/content";

export function About({ content }: { content: Content }) {
  const { profile, education, certifications, languages, ui } = content;
  return (
    <Section id="about" title={ui.about.title}>
      <div className="about-layout">
        <div className="about-story">
          <p>{profile.summary}</p>
          {certifications.length ? (
            <div className="certifications">
              <h3>{ui.about.certificationsHeading}</h3>
              <ul>
                {certifications.map((certification) => (
                  <li key={certification.file}>
                    <a href={certification.file} target="_blank" rel="noreferrer noopener"
                      aria-label={ui.about.certificateLinkLabel.replace("{name}", certification.name)}>
                      {certification.name}<ExternalLinkIcon className="ml-2 inline h-3.5 w-3.5" />
                    </a>
                    <p>{certification.issuer}</p>
                    <p>{certification.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <aside className="education-panel">
          <h3>{ui.about.educationHeading}</h3>
          <p className="education-school">{education.school}</p>
          <p className="mt-5">{education.degree}</p>
          <p className="mt-2">{education.faculty}</p>
          <p className="mt-5 text-sm">{education.graduated}</p>
          <a href={documents.transcript} target="_blank" rel="noreferrer noopener"
            aria-label={ui.about.transcriptLinkLabel} className="text-action mt-6">
            <DocumentIcon className="h-4 w-4" />{ui.about.transcript}
          </a>
          <div className="education-languages">
            <h3>{ui.about.languagesHeading}</h3>
            <dl>{languages.map((language) => (
              <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>
            ))}</dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
