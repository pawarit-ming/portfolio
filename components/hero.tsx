import Link from "next/link";
import type { Content } from "@/lib/content";
import { documents, identity, socials } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import { ProjectGallery } from "@/components/project-gallery";
import { ArrowRightIcon, DocumentIcon } from "@/components/icons";
import { ProjectWorkflow } from "@/components/project-workflow";

export function Hero({
  content, locale, basePath = "", stack, resume = documents.resume,
}: {
  content: Content;
  locale: Locale;
  basePath?: string;
  stack?: string[];
  resume?: string;
}) {
  const { profile, projects, ui } = content;
  const featuredProject = projects.find((project) => project.cover);

  return (
    <section className="portfolio-hero" aria-labelledby="intro-heading">
      <div className="page-wrap">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-identity">
              <h1 id="intro-heading" className="hero-name">{profile.name}</h1>
              <p className="hero-role">{profile.role}</p>
              <div className="hero-location">
                <p>{profile.location}</p>
                <p>{profile.availability}</p>
              </div>
            </div>
            <div className="hero-summary">
              <p className="hero-description">{profile.headline}</p>
              <div className="hero-actions">
                <Link href="#projects" className="primary-action">
                  {ui.hero.viewProjects}<ArrowRightIcon className="h-4 w-4" />
                </Link>
                <a href={resume} target="_blank" rel="noreferrer noopener"
                  aria-label={ui.hero.resumeLinkLabel} className="text-action">
                  <DocumentIcon className="h-4 w-4" />{ui.hero.resume}
                </a>
              </div>
              <div className="hero-links">
                {socials.filter((social) => social.href.trim()).map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
                    {social.label}
                  </a>
                ))}
                <a href={`mailto:${identity.email}`}>{ui.contact.emailLabel}</a>
              </div>
            </div>
          </div>

          {featuredProject?.cover ? (
            <div className="hero-project">
              <div className="hero-project-media">
                <ProjectGallery images={[featuredProject.cover]} spotlight labels={{
                  closeImage: ui.project.closeImage,
                  previousImage: ui.project.previousImage,
                  nextImage: ui.project.nextImage,
                  imageCounter: ui.project.imageCounter,
                }} />
              </div>
              <div className="hero-project-story">
                <div>
                  <h2>
                    <Link href={localePath(locale, `${basePath}/projects/${featuredProject.slug}`)}>
                      {featuredProject.title}
                    </Link>
                  </h2>
                  <p className="hero-project-kind">{featuredProject.kind}</p>
                </div>
                {featuredProject.spotlight ? (
                  <div className="hero-project-proof">
                    <h3>{featuredProject.spotlight.title}</h3>
                    <p>{featuredProject.spotlight.description}</p>
                  </div>
                ) : null}
                <Link className="text-action"
                  href={localePath(locale, `${basePath}/projects/${featuredProject.slug}`)}>
                  {ui.projects.readCaseStudy}
                </Link>
              </div>
              <div className="hero-project-context">
                {featuredProject.workflow?.length ? (
                  <ProjectWorkflow steps={featuredProject.workflow} label={ui.project.workflow} />
                ) : null}
                {featuredProject.gallery?.[0]?.caption ? (
                  <p className="hero-project-note">{featuredProject.gallery[0].caption}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {stack?.length ? (
          <ul className="hero-stack" aria-label={ui.skills.title}>
            {stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
