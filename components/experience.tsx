import Link from "next/link";
import { Section } from "@/components/section";
import { TagList } from "@/components/tag";
import { ArrowRightIcon } from "@/components/icons";
import { experience } from "@/lib/data";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have worked"
      description="Two internships: one shipping a production frontend, one on the other side of it — writing and automating the tests."
      tinted
    >
      <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.8125rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-faint ring-1 ring-line sm:-left-[2.3125rem]"
            />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                {job.role}
              </h3>
              <p className="shrink-0 font-mono text-xs text-subtle">
                {job.period}
              </p>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>

            <ul className="mt-4 space-y-2.5">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 text-sm leading-relaxed text-body"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.55rem] h-1 w-1 rounded-full bg-faint"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <TagList items={job.stack} />
            </div>

            {job.projectSlug ? (
              <Link
                href={`/projects/${job.projectSlug}`}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
              >
                Read the case study
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
