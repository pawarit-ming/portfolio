import type { StaticImageData } from "next/image";
import landing from "@/public/projects/fyt-sme-platform/landing.webp";
import rfqForm from "@/public/projects/fyt-sme-platform/client-rfq-form.webp";
import rfqList from "@/public/projects/fyt-sme-platform/client-rfq-list.webp";
import settings from "@/public/projects/fyt-sme-platform/wi-settings.webp";
import registration from "@/public/projects/asset-management-system/registration-wizard.webp";
import inspection from "@/public/projects/asset-management-system/inspection.webp";
import supplier from "@/public/projects/asset-management-system/add-supplier.webp";
import herd from "@/public/projects/thai-cattle-passport/herd-list-screen.webp";
import profile from "@/public/projects/thai-cattle-passport/cow-profile-screen.webp";
import activity from "@/public/projects/thai-cattle-passport/activity-log-screen.webp";
import passport from "@/public/projects/thai-cattle-passport/qr-passport-screen.webp";
import marketplace from "@/public/projects/thai-cattle-passport/marketplace-screen.webp";
import seller from "@/public/projects/thai-cattle-passport/seller-location-screen.webp";
import { Section, sectionLabel } from "@/components/section";
import { GithubIcon } from "@/components/icons";
import { ProjectScreens } from "@/components/project-screens";
import type { Content } from "@/lib/content";

// Static imports reserve each screenshot's real proportions before it loads,
// and give each a tiny blurred preview to show until the real one arrives.
const screenImages: Record<string, StaticImageData> = {
  "/projects/fyt-sme-platform/landing.webp": landing,
  "/projects/fyt-sme-platform/client-rfq-form.webp": rfqForm,
  "/projects/fyt-sme-platform/client-rfq-list.webp": rfqList,
  "/projects/fyt-sme-platform/wi-settings.webp": settings,
  "/projects/asset-management-system/registration-wizard.webp": registration,
  "/projects/asset-management-system/inspection.webp": inspection,
  "/projects/asset-management-system/add-supplier.webp": supplier,
  "/projects/thai-cattle-passport/herd-list-screen.webp": herd,
  "/projects/thai-cattle-passport/cow-profile-screen.webp": profile,
  "/projects/thai-cattle-passport/activity-log-screen.webp": activity,
  "/projects/thai-cattle-passport/qr-passport-screen.webp": passport,
  "/projects/thai-cattle-passport/marketplace-screen.webp": marketplace,
  "/projects/thai-cattle-passport/seller-location-screen.webp": seller,
};

export function Projects({ content }: { content: Content }) {
  const { projects, otherProjects, ui } = content;
  return (
    <Section id="projects" title={ui.projects.title} label={sectionLabel(content, 1, "#projects")} description={ui.projects.description}>
      <div className="project-ledger">
        {projects.map((project, index) => {
          const [source] = project.links ?? [];
          return (
          <article key={project.slug} className="project-entry">
            <div className="project-preview">
              <p className="project-preview-top">{project.highlight.value} · {project.highlight.label}</p>
              <div className="project-preview-media">
                <ProjectScreens
                  screens={project.screens.map((screen) => ({ ...screen, image: screenImages[screen.src] }))}
                  labels={ui.projects.screens}
                />
              </div>
            </div>
            {/* Index, name and line on one row; the stack and the kind of work below. */}
            <div className="project-information">
              <p className="project-index" aria-hidden="true">/{String(index + 1).padStart(2, "0")}</p>
              <div className="project-heading">
                <h3>{project.title}</h3>
                <p className="project-description">{project.tagline}</p>
              </div>
              {source ? (
                <a className="project-open" href={source.href} target="_blank" rel="noreferrer noopener"
                  aria-label={`${source.label}: ${project.title}`} title={source.label}>
                  <GithubIcon className="h-4 w-4" />
                </a>
              ) : null}
              <p className="project-meta">
                <span>{project.stack.slice(0, 3).join(" · ")}</span>
                <span>{project.kind} · {project.period}</span>
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
