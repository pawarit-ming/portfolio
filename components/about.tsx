import { Section, sectionLabel } from "@/components/section";
import { DocumentIcon, ExternalLinkIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { documents } from "@/lib/content";

/** Three ruled columns, the same language as Skills: education, certificates, languages. */
export function About({ content }: { content: Content }) {
  const { profile, education, certifications, languages, ui } = content;
  return (
    <Section id="about" title={ui.about.title} label={sectionLabel(content, 2, "#about")}
      description={profile.summary} tinted>
      <div className="about-grid">
        <div className="about-column">
          <h3 className="about-heading">{ui.about.educationHeading}</h3>
          <p className="education-school">{education.school}</p>
          <p>{education.degree}</p>
          <p>{education.faculty}</p>
          <p>{education.graduated}</p>
          <a href={documents.transcript} target="_blank" rel="noreferrer noopener"
            aria-label={ui.about.transcriptLinkLabel} className="text-action mt-3">
            <DocumentIcon className="h-4 w-4" />{ui.about.transcript}
          </a>
        </div>
        {certifications.length ? (
          <div className="about-column">
            <h3 className="about-heading">{ui.about.certificationsHeading}</h3>
            <ul className="certifications">
              {certifications.map((certification) => (
                <li key={certification.file}>
                  <a href={certification.file} target="_blank" rel="noreferrer noopener"
                    aria-label={ui.about.certificateLinkLabel.replace("{name}", certification.name)}>
                    {certification.name}<ExternalLinkIcon className="ml-2 inline h-3.5 w-3.5" />
                  </a>
                  <p>{certification.issuer} · {certification.date}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="about-column">
          <h3 className="about-heading">{ui.about.languagesHeading}</h3>
          <dl className="about-languages">{languages.map((language) => (
            <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>
          ))}</dl>
        </div>
      </div>
    </Section>
  );
}
