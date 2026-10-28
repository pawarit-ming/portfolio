import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import rfqPreview from "@/public/projects/fyt-sme-platform/client-rfq-form.webp";
import assetPreview from "@/public/projects/asset-management-system/registration-wizard.webp";
import herdPreview from "@/public/projects/thai-cattle-passport/herd-list-screen.webp";
import qrPreview from "@/public/projects/thai-cattle-passport/qr-passport-screen.webp";
import marketplacePreview from "@/public/projects/thai-cattle-passport/marketplace-screen.webp";
import { Section, sectionLabel } from "@/components/section";
import { ProjectImageFrame } from "@/components/project-image";
import { ArrowRightIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

// Static imports reserve each screenshot's real proportions before it loads,
// and give each a tiny blurred preview to show until the real one arrives.
// The cards load eagerly: About now sits above them, so by the time a reader
// scrolls here a lazy image would only just be starting.
const previewImages: Record<string, StaticImageData> = {
  "/projects/fyt-sme-platform/client-rfq-form.webp": rfqPreview,
  "/projects/asset-management-system/registration-wizard.webp": assetPreview,
};
const phonePreviewImages: Record<string, StaticImageData> = {
  "/projects/thai-cattle-passport/herd-list-screen.webp": herdPreview,
  "/projects/thai-cattle-passport/qr-passport-screen.webp": qrPreview,
  "/projects/thai-cattle-passport/marketplace-screen.webp": marketplacePreview,
};

export function Projects({ locale, basePath = "", content }: {
  locale: Locale;
  basePath?: string;
  content: Content;
}) {
  const { projects, otherProjects, ui } = content;
  return (
    <Section id="projects" title={ui.projects.title} label={sectionLabel(content, 1, "#projects")} description={ui.projects.description}>
      <div className="project-ledger">
        {projects.map((project, index) => {
          const href = localePath(locale, `${basePath}/projects/${project.slug}`);
          const preview = index === 0 ? project.gallery?.[1] ?? project.cover : project.cover;
          const previewImage = preview ? previewImages[preview.src] : undefined;
          const phonePreviews = project.gallery?.filter((image) => phonePreviewImages[image.src]) ?? [];
          const [headline] = project.metrics;
          return (
          <article key={project.slug} className="project-entry">
            <Link className="project-preview" href={href}
              aria-label={`${ui.projects.readCaseStudy}: ${project.title}`}>
              <span className="project-preview-top" aria-hidden="true">
                <span className="project-preview-name">{project.title}</span>
                {headline ? <span>{headline.value} · {headline.label}</span> : null}
              </span>
              <span className="project-preview-media">
                {phonePreviews.length ? (
                  <span className="project-phone-previews">
                    {phonePreviews.map((image) => (
                      <Image
                        key={image.src}
                        src={phonePreviewImages[image.src]}
                        alt={image.alt}
                        sizes="(min-width: 900px) 200px, 28vw"
                        loading="eager"
                        placeholder="blur"
                        className="project-phone-image"
                      />
                    ))}
                  </span>
                ) : previewImage && preview ? (
                  <Image
                    src={previewImage}
                    alt={preview.alt}
                    sizes="(min-width: 1280px) 960px, 80vw"
                    loading="eager"
                    placeholder="blur"
                    className="project-preview-image"
                  />
                ) : project.cover ? (
                  <ProjectImageFrame
                    image={{ ...project.cover, caption: undefined }}
                    sizes="(min-width: 1280px) 960px, 80vw"
                    frameClassName="project-cover-frame" />
                ) : null}
              </span>
              <span className="project-preview-arrow" aria-hidden="true"><ArrowRightIcon className="h-4 w-4" /></span>
            </Link>
            {/* Index, name and line on one row; the stack and the kind of work below. */}
            <div className="project-information">
              <p className="project-index" aria-hidden="true">/{String(index + 1).padStart(2, "0")}</p>
              <div className="project-heading">
                <h3><Link href={href}>{project.title}</Link></h3>
                <p className="project-description">{project.tagline}</p>
              </div>
              <Link className="project-open" href={href} aria-label={`${ui.projects.readCaseStudy}: ${project.title}`}>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <p className="project-meta">
                <span>{project.stack.slice(0, 3).join(" · ")}</span>
                <span>{project.kind.split(" · ")[0]} · {project.period}</span>
              </p>
            </div>
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
                <div>
                  <p className="other-work-description">{project.description}</p>
                  <p className="other-work-stack">{project.stack.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </Section>
  );
}
