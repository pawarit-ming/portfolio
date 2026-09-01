import { Section } from "@/components/section";
import type { Content } from "@/lib/content";

export function About({ content }: { content: Content }) {
  const { profile, education, languages, ui } = content;

  // The heading is just the word. It replaced "Interfaces, with an eye for the
  // details", which said nothing the second paragraph does not say better — and
  // there is no eyebrow above it, since it would only repeat the same word one
  // size down.
  return (
    <Section id="about" title={ui.about.title}>
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Two paragraphs. A third one about what I am looking for used to
            sit here and was dropped: unlike the summary above it, it carried
            nothing the hero and the contact section do not already say. */}
        <div className="lg:col-span-3">
          <p className="text-base leading-relaxed text-body">
            {profile.summary}
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-line bg-card p-6">
            <h3 className="text-sm font-semibold text-fg">
              {ui.about.educationHeading}
            </h3>
            <p className="mt-3 text-sm font-medium leading-snug text-fg">
              {education.degree}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-muted">
              {education.faculty}
            </p>
            <p className="text-sm leading-snug text-muted">
              {education.school}
            </p>
            <p className="mt-2 font-mono text-xs text-subtle">
              {education.graduated}
            </p>

            <hr className="my-6 border-line" />

            <h3 className="text-sm font-semibold text-fg">
              {ui.about.languagesHeading}
            </h3>
            <dl className="mt-3 space-y-2">
              {languages.map((language) => (
                <div key={language.name} className="text-sm">
                  <dt className="font-medium text-fg">{language.name}</dt>
                  <dd className="text-muted">{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
