import Link from "next/link";
import type { Content } from "@/lib/content";
import { documents, identity, socials } from "@/lib/content";
import { ArrowRightIcon, DocumentIcon } from "@/components/icons";

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
        <div className="hero-layout">
          <h1 id="intro-heading" className="hero-name">
            <span className="hero-name-mask"><span>{profile.name}</span></span>
          </h1>
          {/* One left edge from top to bottom: the name, the role, the details
              as one quiet line, then the statement and the actions. */}
          <div className="hero-copy">
            <div className="hero-identity">
              <p className="hero-role">{profile.role}</p>
              <p className="hero-details">
                <span>{profile.location} ({profile.relocation})</span>
                <span className="hero-availability">{profile.availability}</span>
              </p>
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
