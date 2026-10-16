import Link from "next/link";
import { TagList } from "@/components/tag";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectWorkflow } from "@/components/project-workflow";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { getContent, type Project } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ProjectCaseStudy({ locale, project, basePath = "" }: {
  locale: Locale;
  project: Project;
  basePath?: string;
}) {
  const { ui, projects } = getContent(locale);
  const otherProjects = projects.filter((item) => item.slug !== project.slug);
  const [leadMetric, ...supportingMetrics] = project.metrics;

  return (
    <article className="case-study">
      <header className="case-study-header">
        <div className="case-study-wrap">
          <Link href={localePath(locale, `${basePath}#projects`)} className="text-action">
            <ArrowLeftIcon className="h-4 w-4" />{ui.project.allProjects}
          </Link>
          <div className="case-study-summary">
            <div className="case-study-introduction">
              <h1>{project.title}</h1>
              <p className="case-study-tagline">{project.tagline}</p>
              <div className="case-study-meta"><p>{project.kind}</p><p>{project.period}</p></div>
              <TagList items={project.stack} />
            </div>
            {leadMetric ? (
              <div className="case-study-proof">
                <dl className="case-study-stats">
                  <div><dt>{leadMetric.label}</dt><dd>{leadMetric.value}</dd></div>
                </dl>
                {supportingMetrics.length ? (
                  <dl className="case-study-support">
                    {supportingMetrics.map((metric) => (
                      <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                    ))}
                  </dl>
                ) : null}
              </div>
            ) : null}
          </div>
          {project.workflow?.length ? (
            <ProjectWorkflow steps={project.workflow} label={ui.project.workflow} />
          ) : null}
          {project.sourceNotice ? <p className="source-notice">{project.sourceNotice}</p> : null}
          {project.links?.length ? (
            <div className="mt-6 flex flex-wrap gap-6">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener"
                  className="text-action">{link.label}</a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="case-study-wrap case-study-body">
        <div className="case-study-context">
          <section aria-labelledby="overview-heading" className="case-study-section case-study-panel">
            <h2 id="overview-heading">{ui.project.overview}</h2>
            <div className="case-study-prose">
              {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section aria-labelledby="role-heading" className="case-study-section case-study-panel">
            <h2 id="role-heading">{ui.project.whatIDid}</h2>
            <div className="case-study-prose">
              <ul>{project.role.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>
        </div>

        {project.gallery?.length ? (
          <section aria-labelledby="gallery-heading" className="case-study-section">
            <h2 id="gallery-heading">{project.galleryTitle ?? ui.project.screens}</h2>
            <ProjectGallery images={project.gallery} labels={{
              closeImage: ui.project.closeImage,
              previousImage: ui.project.previousImage,
              nextImage: ui.project.nextImage,
              imageCounter: ui.project.imageCounter,
            }} />
          </section>
        ) : null}

        <section aria-labelledby="features-heading" className="case-study-section">
          <h2 id="features-heading">{ui.project.keyFeatures}</h2>
          <div className="case-study-features">
            {project.features.map((feature) => (
              <div key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></div>
            ))}
          </div>
        </section>
      </div>

      <footer className="case-study-footer">
        <div className="case-study-wrap">
          {otherProjects.length ? (
            <div>
              <h2 className="text-xl font-semibold">{ui.project.nextProject}</h2>
              <ul className="case-study-next">
                {otherProjects.map((other) => (
                  <li key={other.slug}>
                    <Link href={localePath(locale, `${basePath}/projects/${other.slug}`)}>
                      <span><strong>{other.title}</strong><span>{other.kind}</span></span>
                      <ArrowRightIcon className="h-4 w-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <p>{ui.project.interested}</p>
            <Link href={localePath(locale, `${basePath}#contact`)} className="primary-action">
              {ui.getInTouch}
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
