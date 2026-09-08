import { Section } from "@/components/section";
import { DocumentIcon, ExternalLinkIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { documents } from "@/lib/content";

export function About({ content }: { content: Content }) {
  const { profile, education, certifications, languages, ui } = content;

  // The heading is just the word. It replaced "Interfaces, with an eye for the
  // details", which said nothing the second paragraph does not say better — and
  // there is no eyebrow above it, since it would only repeat the same word one
  // size down.
  return (
    <Section id="about" title={ui.about.title}>
      {/* Twelve columns split 7/5, not five split 3/2.

          The card on the right holds the two longest unbreakable lines on the
          page — the degree and the faculty, both around 350px — and at 2/5 of
          this row it was 300px wide, so both wrapped. 5/12 gives it 378px and
          they fit with room to spare in either language.

          It costs the left column nothing worth having: the summary lands at
          ~597px, which is a shorter line than 3/5 of this row would give it and
          closer to the measure prose actually wants. */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* One paragraph. A second one about what I am looking for used to
            sit here and was dropped: unlike the summary above it, it carried
            nothing the hero and the contact section do not already say. */}
        <div className="lg:col-span-7">
          <p className="text-base leading-relaxed text-body">
            {profile.summary}
          </p>

          {/* Certifications belong with the education card on the right, and
              sat there until there were four of them: the card ran ~600px
              past the end of this paragraph, leaving the wider column empty
              beside a tall thin list. Here they fill the space the summary
              does not, and the two columns come out roughly level in both
              languages — which a layout keyed to the paragraph's own length
              would not.

              Two across, because these entries are short and one per row
              would just rebuild the same tall list in a wider column. */}
          {certifications.length > 0 ? (
            <div className="mt-10 border-t border-line pt-8">
              <h3 className="text-sm font-semibold text-fg">
                {ui.about.certificationsHeading}
              </h3>
              {/* Each name links to its own PDF. The link opens in a new tab
                  rather than replacing the page: a certificate is something
                  you glance at and come back from, and the browser's own PDF
                  viewer has no way back to the site. */}
              <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {certifications.map((certification) => {
                  // The icon is tied to the final word so the two wrap as one.
                  // Left inline it breaks like any other word, and in these
                  // narrow columns "IoT Fundamentals: Connecting Things" did
                  // exactly that — the name filled the line and the arrow
                  // dropped onto a second one by itself.
                  const words = certification.name.split(" ");
                  const lastWord = words.pop() ?? "";
                  const head = words.join(" ");

                  return (
                    <li key={certification.file} className="text-sm">
                      <a
                        href={certification.file}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={ui.about.certificateLinkLabel.replace(
                          "{name}",
                          certification.name,
                        )}
                        className="group font-medium leading-snug text-fg transition-colors hover:text-accent"
                      >
                        {head ? `${head} ` : null}
                        <span className="whitespace-nowrap">
                          {lastWord}
                          <ExternalLinkIcon className="ml-1.5 inline h-3 w-3 align-[-0.1em] text-faint transition-colors group-hover:text-accent" />
                        </span>
                      </a>
                      <p className="mt-0.5 leading-snug text-muted">
                        {certification.issuer}
                      </p>
                      <p className="font-mono text-xs text-subtle">
                        {certification.date}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-5">
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

            {/* The transcript hangs off the degree rather than joining the
                certificate list on the left: it is not a course someone
                passed, it is the evidence for the four lines directly above
                it, and it reads as that only while it sits under them.

                Same solid red as the resume button in the hero, at the size
                this card can carry. Two buttons to two PDFs that look like
                each other are one thing a reader has to learn rather than two,
                and as a plain line of text under four other plain lines of
                text this one was invisible.

                The certificate names on the left stay unstyled on purpose:
                four red rows there would be the loudest thing in the section,
                and they are a list to read down, not a control to press. */}
            <a
              href={documents.transcript}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={ui.about.transcriptLinkLabel}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-pdf px-3 py-1.5 text-sm font-medium text-on-pdf transition-colors hover:bg-pdf-hover"
            >
              <DocumentIcon className="h-4 w-4 shrink-0" />
              {ui.about.transcript}
            </a>

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
