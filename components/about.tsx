import { Section } from "@/components/section";
import { education, languages, profile } from "@/lib/data";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Interfaces, with an eye for the details"
    >
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="space-y-5 lg:col-span-3">
          <p className="text-base leading-relaxed text-body">
            {profile.summary}
          </p>
          <p className="text-base leading-relaxed text-body">
            {profile.summarySecondary}
          </p>
          <p className="text-base leading-relaxed text-body">
            I am now looking for a role where I can keep building interfaces
            people rely on every day —{" "}
            <span className="font-medium text-fg">on the web, on
            mobile, or across both</span>. The work I enjoy most sits close to
            the user, whichever platform that turns out to be.
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-line bg-card p-6">
            <h3 className="text-sm font-semibold text-fg">Education</h3>
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

            <h3 className="text-sm font-semibold text-fg">Languages</h3>
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
