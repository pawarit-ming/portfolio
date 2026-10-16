import Link from "next/link";
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

  return (
    <article className="case-study">
      <header className="case-study-header">
        <div className="case-study-wrap">
          <Link href={localePath(locale, `${basePath}#projects`)} className="text-action">
            <ArrowLeftIcon className="h-4 w-4" />{ui.project.allProjects}
          </Link>
          <h1 className="case-study-title">
            <span className="case-study-title-mask"><span>{project.title}</span></span>
          </h1>
          {/* The header carries only what decides whether to read on: what it
              is, its status, and the figures. Everything else is below. */}
          <div className="case-study-lede">
            <p className="case-study-tagline">{project.tagline}</p>
            <p className="case-study-facts">
              <span className="case-study-kind">{project.kind}</span>
              <span>{project.period}</span>
            </p>
          </div>
          {project.metrics.length ? (
            <dl className="case-study-metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
              ))}
            </dl>
          ) : null}
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
        {project.gallery?.length ? (
          <section aria-labelledby="gallery-heading" className="case-study-section case-study-screens">
            <h2 id="gallery-heading">{project.galleryTitle ?? ui.project.screens}</h2>
            <ProjectGallery images={project.gallery} labels={{
              closeImage: ui.project.closeImage,
              previousImage: ui.project.previousImage,
              nextImage: ui.project.nextImage,
              imageCounter: ui.project.imageCounter,
            }} />
          </section>
        ) : null}

        <div className="case-study-context">
          <section aria-labelledby="overview-heading" className="case-study-section case-study-panel">
            <h2 id="overview-heading">{ui.project.overview}</h2>
            <div className="case-study-prose">
              {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {project.workflow?.length ? (
              <ProjectWorkflow steps={project.workflow} label={ui.project.workflow} />
            ) : null}
            {project.sourceNotice ? <p className="source-notice">{project.sourceNotice}</p> : null}
          </section>

          <section aria-labelledby="role-heading" className="case-study-section case-study-panel">
            <h2 id="role-heading">{ui.project.whatIDid}</h2>
            <div className="case-study-prose">
              <ul>{project.role.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <p className="case-study-stack">
              {project.stack.map((item, index) => (
                <span key={item}>{index > 0 ? " · " : null}<span>{item}</span></span>
              ))}
            </p>
          </section>
        </div>

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
              <h2 className="case-study-next-heading">{ui.project.nextProject}</h2>
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
          <div className="case-study-cta">
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
