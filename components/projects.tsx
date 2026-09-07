import Link from "next/link";
import { Section } from "@/components/section";
import { TagList } from "@/components/tag";
import { ProjectImageFrame } from "@/components/project-image";
import { ArrowRightIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

export function Projects({
  locale,
  basePath = "",
  content,
}: {
  locale: Locale;
  /** `""` on the default site, `"/for/dba"` inside a role variant. */
  basePath?: string;
  content: Content;
}) {
  const { projects, otherProjects, ui } = content;

  return (
    <Section
      id="projects"
      eyebrow={ui.projects.eyebrow}
      title={ui.projects.title}
      description={ui.projects.description}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors hover:border-line-strong"
          >
            {project.cover ? (
              <ProjectImageFrame
                image={project.cover}
                sizes="(min-width: 768px) 50vw, 100vw"
                frameClassName="border-b border-line"
              />
            ) : null}

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="font-mono text-xs text-subtle">{project.period}</p>

              <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">
                <Link
                  href={localePath(locale, `${basePath}/projects/${project.slug}`)}
                  className="before:absolute before:inset-0 before:content-['']"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-subtle">{project.kind}</p>

              <p className="mt-4 text-sm leading-relaxed text-body">
                {project.tagline}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
                {project.metrics.slice(0, 4).map((metric) => (
                  // Same reversal as the hero stats: value on top, dt still
                  // first in the DOM, and `justify-end` keeping the values
                  // level when one label wraps onto a second line.
                  <div
                    key={metric.label}
                    className="flex flex-col-reverse justify-end"
                  >
                    <dt className="mt-0.5 text-xs leading-snug text-subtle">
                      {metric.label}
                    </dt>
                    <dd className="text-lg font-semibold tracking-tight text-fg">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <TagList items={project.stack.slice(0, 5)} />
              </div>

              <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
                {ui.projects.readCaseStudy}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </p>
            </div>
          </article>
        ))}
      </div>

      {otherProjects.length > 0 ? (
        <div className="mt-16">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
            {ui.projects.otherHeading}
          </h3>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors hover:border-line-strong"
              >
                {project.image ? (
                  <ProjectImageFrame
                    image={project.image}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    frameClassName="border-b border-line"
                  />
                ) : null}

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-base font-semibold tracking-tight text-fg">
                      {project.title}
                    </h4>
                    {project.period ? (
                      <span className="shrink-0 font-mono text-xs text-subtle">
                        {project.period}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-4">
                    <TagList items={project.stack} />
                  </div>

                  {project.links && project.links.length > 0 ? (
                    <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5">
                      {project.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
                          >
                            {link.label}
                            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </Section>
  );
}
