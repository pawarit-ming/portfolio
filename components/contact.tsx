import { ContactForm } from "@/components/contact-form";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import type { Content } from "@/lib/content";
import { identity, socials } from "@/lib/content";

export function Contact({ content }: { content: Content }) {
  const { profile, targetRoles, ui } = content;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="portfolio-section section-tinted">
      <div className="page-wrap">
        <div className="contact-layout">
          <div className="contact-information">
            <header className="section-introduction">
              <h2 id="contact-heading">{ui.contact.title}</h2>
              <p>{ui.contact.description}</p>
            </header>
            <dl className="contact-details">
              <div>
                <dt>{ui.contact.emailLabel}</dt>
                <dd><a className="contact-email" href={`mailto:${identity.email}`}><span>{identity.email}</span><ArrowRightIcon /></a></dd>
              </div>
              <div>
                <dt>{ui.contact.phoneLabel}</dt>
                <dd><a href={`tel:${identity.phoneHref}`}>{identity.phone}</a></dd>
              </div>
              <div>
                <dt>{ui.contact.locationLabel}</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
            <div className="contact-roles">
              <h3>{ui.contact.rolesHeading}</h3>
              <p>{targetRoles.map((role) => role.label).join(" · ")}</p>
            </div>
            <div className="contact-socials">
              {socials.filter((social) => social.href.trim()).map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}<ExternalLinkIcon />
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form-panel">
            <h3>{ui.form.submit}</h3>
            <ContactForm copy={ui.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
