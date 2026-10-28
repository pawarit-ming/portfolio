import type { Content } from "@/lib/content";
import { documents, identity, socials } from "@/lib/content";
import { ArrowRightIcon, DocumentIcon } from "@/components/icons";
import { SectionLink } from "@/components/section-link";

export function Hero({
  content, stack, resume = documents.resume,
}: {
  content: Content;
  stack?: string[];
  resume?: string;
}) {
  const { profile, ui } = content;

  return (
    <section className="portfolio-hero" aria-labelledby="intro-heading">
      <div className="page-wrap">
        <div className="hero-topline">
          <p className="hero-role">{profile.role}</p>
        </div>

        {/* Type alone carries the first screen: the name, then one statement. */}
        <h1 id="intro-heading" className="hero-name">
          <span className="hero-name-mask">
            <span>{profile.name}<span className="hero-dot" aria-hidden="true">.</span></span>
          </span>
        </h1>
        <p className="hero-description">{profile.headline}</p>

        <div className="hero-footer">
          <div>
            <p className="hero-availability">{profile.availability}</p>
            <p className="hero-detail">{profile.relocation}</p>
          </div>
          <div className="hero-links">
            {socials.filter((social) => social.href.trim()).map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            ))}
            <a href={`mailto:${identity.email}`}>{ui.contact.emailLabel}</a>
          </div>
          <div className="hero-actions">
            <a href={resume} target="_blank" rel="noreferrer noopener"
              aria-label={ui.hero.resumeLinkLabel} className="text-action">
              <DocumentIcon className="h-4 w-4" />{ui.hero.resume}
            </a>
            <SectionLink href="#projects" className="primary-action">
              {ui.hero.viewProjects}<ArrowRightIcon className="h-4 w-4" />
            </SectionLink>
          </div>
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
