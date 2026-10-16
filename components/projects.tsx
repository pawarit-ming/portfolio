import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import rfqPreview from "@/public/projects/fyt-sme-platform/client-rfq-form.png";
import assetPreview from "@/public/projects/asset-management-system/registration-wizard.png";
import herdPreview from "@/public/projects/thai-cattle-passport/herd-list-screen.png";
import qrPreview from "@/public/projects/thai-cattle-passport/qr-passport-screen.png";
import marketplacePreview from "@/public/projects/thai-cattle-passport/marketplace-screen.png";
import { Section } from "@/components/section";
import { ProjectImageFrame } from "@/components/project-image";
import { ArrowRightIcon } from "@/components/icons";
import { ProjectWorkflow } from "@/components/project-workflow";
import type { Content } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

// Static imports reserve each screenshot's real proportions before it loads.
const previewImages: Record<string, StaticImageData> = {
  "/projects/fyt-sme-platform/client-rfq-form.png": rfqPreview,
  "/projects/asset-management-system/registration-wizard.png": assetPreview,
};
const phonePreviewImages: Record<string, StaticImageData> = {
  "/projects/thai-cattle-passport/herd-list-screen.png": herdPreview,
  "/projects/thai-cattle-passport/qr-passport-screen.png": qrPreview,
  "/projects/thai-cattle-passport/marketplace-screen.png": marketplacePreview,
};

export function Projects({ locale, basePath = "", content }: {
  locale: Locale;
  basePath?: string;
  content: Content;
}) {
  const { projects, otherProjects, ui } = content;
  return (
    <Section id="projects" title={ui.projects.title} description={ui.projects.description}>
      <div className="project-ledger">
        {projects.map((project, index) => {
          const preview = index === 0 ? project.gallery?.[1] ?? project.cover : project.cover;
          const previewImage = preview ? previewImages[preview.src] : undefined;
          const phonePreviews = project.gallery?.filter((image) => phonePreviewImages[image.src]) ?? [];
          return (
          <article key={project.slug} className={`project-entry${index === 0 ? " project-entry-featured" : ""}`}>
            <div className="project-information">
              <h3>
                <Link href={localePath(locale, `${basePath}/projects/${project.slug}`)}>
                  {project.title}
                </Link>
              </h3>
              <p className="project-kind">{project.kind} · {project.period}</p>
              <p className="project-description">{project.tagline}</p>
              {project.workflow?.length ? (
                <ProjectWorkflow steps={project.workflow} label={ui.project.workflow} />
              ) : null}
              <dl className="project-metrics">
                {project.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt><dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="project-stack">{project.stack.slice(0, 3).join(" · ")}</p>
              <Link className="text-action project-action"
                href={localePath(locale, `${basePath}/projects/${project.slug}`)}>
                {ui.projects.readCaseStudy}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            {project.cover ? (
              <Link className="project-preview"
                href={localePath(locale, `${basePath}/projects/${project.slug}`)}
                aria-label={`${ui.projects.readCaseStudy}: ${project.title}`}>
                {phonePreviews.length ? (
                  <div className="project-phone-previews">
                    {phonePreviews.map((image) => (
                      <Image
                        key={image.src}
                        src={phonePreviewImages[image.src]}
                        alt={image.alt}
                        sizes="(min-width: 1280px) 160px, (min-width: 900px) 14vw, (min-width: 600px) 180px, 26vw"
                        className="project-phone-image"
                      />
                    ))}
                  </div>
                ) : previewImage && preview ? (
                  <Image
                    src={previewImage}
                    alt={preview.alt}
                    sizes={index === 0 ? "(min-width: 1280px) 620px, (min-width: 900px) 50vw, calc(100vw - 80px)" : "(min-width: 1280px) 540px, (min-width: 900px) 42vw, calc(100vw - 80px)"}
                    className="project-preview-image"
                  />
                ) : (
                  <ProjectImageFrame
                    image={{ ...project.cover, caption: undefined }}
                    sizes="(min-width: 1280px) 620px, (min-width: 900px) 50vw, calc(100vw - 80px)"
                    frameClassName="project-cover-frame" />
                )}
              </Link>
            ) : null}
          </article>
          );
        })}
      </div>
      {otherProjects.length ? (
        <section className="other-work" aria-labelledby="other-projects-heading">
          <h3 id="other-projects-heading">{ui.projects.otherHeading}</h3>
          <div className="other-work-list">
            {otherProjects.map((project) => (
              <article key={project.title} className="other-work-entry">
                <div className="other-work-meta">
                  <h4>{project.title}</h4>
                  {project.period ? <p>{project.period}</p> : null}
                </div>
                <div className="other-work-description">
                  {project.image ? (
                    <ProjectImageFrame image={project.image}
                      sizes="(min-width: 1280px) 540px, (min-width: 768px) 55vw, 100vw" />
                  ) : null}
                  <p>{project.description}</p>
                  {project.links?.length ? (
                    <ul className="mt-3 flex flex-wrap gap-5">
                      {project.links.map((link) => <li key={link.href}>
                        <a className="text-action" href={link.href} target="_blank" rel="noreferrer noopener">
                          {link.label}
                        </a>
                      </li>)}
                    </ul>
                  ) : null}
                </div>
                <p className="other-work-stack">{project.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </Section>
  );
}
