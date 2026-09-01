import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Tag } from "@/components/tag";
import { MailIcon, PhoneIcon, PinIcon, socialIcons } from "@/components/icons";
import type { Content } from "@/lib/content";
import { identity, socials } from "@/lib/content";

export function Contact({ content }: { content: Content }) {
  const { profile, targetRoles, ui } = content;
  const activeSocials = socials.filter((social) => social.href.trim() !== "");

  return (
    <Section
      id="contact"
      eyebrow={ui.contact.eyebrow}
      title={ui.contact.title}
      description={ui.contact.description}
    >
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <h3 className="text-xs font-medium uppercase tracking-wider text-subtle">
            {ui.contact.rolesHeading}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {targetRoles.map((role) => (
              <li key={role.label}>
                <Tag tone="accent">{role.label}</Tag>
              </li>
            ))}
          </ul>

          <hr className="my-8 border-line" />

          <ul className="space-y-5">
            <li>
              <a
                href={`mailto:${identity.email}`}
                className="group flex items-start gap-3"
              >
                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-subtle">
                    {ui.contact.emailLabel}
                  </span>
                  <span className="mt-0.5 block text-sm text-fg underline-offset-4 group-hover:underline">
                    {identity.email}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${identity.phoneHref}`}
                className="group flex items-start gap-3"
              >
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-subtle">
                    {ui.contact.phoneLabel}
                  </span>
                  <span className="mt-0.5 block text-sm text-fg underline-offset-4 group-hover:underline">
                    {identity.phone}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
              <span>
                <span className="block text-xs font-medium uppercase tracking-wider text-subtle">
                  {ui.contact.locationLabel}
                </span>
                <span className="mt-0.5 block text-sm text-fg">
                  {profile.location}
                </span>
              </span>
            </li>
          </ul>

          {activeSocials.length > 0 ? (
            <ul className="mt-8 flex gap-2">
              {activeSocials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line-strong bg-card text-muted transition-colors hover:border-line-stronger hover:text-fg"
                    >
                      <span className="sr-only">{social.label}</span>
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="lg:col-span-3">
          <ContactForm copy={ui.form} />
        </div>
      </div>
    </Section>
  );
}
