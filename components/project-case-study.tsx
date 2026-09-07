import Link from "next/link";
import { TagList } from "@/components/tag";
import { ProjectImageFrame } from "@/components/project-image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { getContent, type Project } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * A project case study, shared by `/[locale]/projects/[slug]` and the same page
 * under a role variant.
 *
 * The content is identical in both: a variant changes how the homepage
 * introduces me, not what the work was. Only `basePath` differs, so that the
 * links out of here — back to the projects list, on to the next project, down
 * to the contact form — return to the homepage the reader actually came from.
 */
export function ProjectCaseStudy({
  locale,
  project,
  /** `""` on the default route, `"/for/dba"` under a role variant. */
  basePath = "",
}: {
  locale: Locale;
  project: Project;
  basePath?: string;
}) {
  const { ui, projects } = getContent(locale);
  const otherProjects = projects.filter((item) => item.slug !== project.slug);
  const phoneGallery = project.gallery?.[0]?.aspect === "phone";

  return (
    <article>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20 lg:px-8">
          <Link
            href={localePath(locale, `${basePath}#projects`)}
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {ui.project.allProjects}
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {project.kind}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {project.tagline}
          </p>
          <p className="mt-6 font-mono text-xs text-subtle">{project.period}</p>

          <div className="mt-6">
            <TagList items={project.stack} />
          </div>

          {project.links && project.links.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-card px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-line-stronger hover:bg-surface"
                >
                  {link.label}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* The cover is the card thumbnail on the homepage; here every screenshot
          lives together in the gallery rather than one floating above the text. */}
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 lg:px-8">
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((metric) => (
            // Reversed so the value sits on top, while the DOM keeps dt before dd.
            // `justify-end` is the top here, because the main axis runs upward:
            // without it a one-line label leaves its value hanging a line below
            // its neighbours', since the cells all stretch to the tallest one.
            <div
              key={metric.label}
              className="flex flex-col-reverse justify-end bg-card px-5 py-6"
            >
              <dt className="mt-1 text-xs leading-snug text-subtle">
                {metric.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight text-fg">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="overview-heading" className="mt-16">
          <h2
            id="overview-heading"
            className="text-xl font-semibold tracking-tight text-fg"
          >
            {ui.project.overview}
          </h2>
          <div className="mt-4 space-y-4">
            {project.overview.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="role-heading" className="mt-14">
          <h2
            id="role-heading"
            className="text-xl font-semibold tracking-tight text-fg"
          >
            {ui.project.whatIDid}
          </h2>
          <ul className="mt-4 space-y-3">
            {project.role.map((item) => (
              <li
                key={item}
                className="relative pl-5 text-base leading-relaxed text-body"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="features-heading" className="mt-14">
          <h2
            id="features-heading"
            className="text-xl font-semibold tracking-tight text-fg"
          >
            {ui.project.keyFeatures}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-line bg-card p-5"
              >
                <h3 className="text-sm font-semibold text-fg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {project.gallery && project.gallery.length > 0 ? (
          <section aria-labelledby="gallery-heading" className="mt-14">
            <h2
              id="gallery-heading"
              className="text-xl font-semibold tracking-tight text-fg"
            >
              {ui.project.screens}
            </h2>
            {/* Phone shots are narrow enough to sit three across; browser
                screenshots need the extra width to stay readable, and the
                first of them leads at full width. */}
            <div
              className={
                phoneGallery
                  ? "mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3"
                  : "mt-6 grid gap-5 sm:grid-cols-2"
              }
            >
              {project.gallery.map((image, index) => {
                const lead = !phoneGallery && index === 0;
                return (
                  <ProjectImageFrame
                    key={image.src}
                    image={image}
                    className={lead ? "sm:col-span-2" : undefined}
                    sizes={
                      phoneGallery
                        ? "(min-width: 640px) 33vw, 50vw"
                        : lead
                          ? "(min-width: 768px) 768px, 100vw"
                          : "(min-width: 640px) 50vw, 100vw"
                    }
                    frameClassName="rounded-xl border border-line"
                  />
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 lg:px-8">
          {otherProjects.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                {ui.project.nextProject}
              </p>
              <ul className="mt-4 space-y-3">
                {otherProjects.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={localePath(locale, `${basePath}/projects/${other.slug}`)}
                      className="group flex items-baseline justify-between gap-6 rounded-lg border border-line bg-card px-5 py-4 transition-colors hover:border-line-strong"
                    >
                      <span>
                        <span className="block text-base font-semibold tracking-tight text-fg">
                          {other.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-subtle">
                          {other.kind}
                        </span>
                      </span>
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <p className="text-sm text-muted">{ui.project.interested}</p>
            <Link
              href={localePath(locale, `${basePath}#contact`)}
              className="inline-flex items-center gap-2 rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
            >
              {ui.getInTouch}
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
