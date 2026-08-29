import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Tag } from "@/components/tag";
import { MailIcon, PhoneIcon, PinIcon, socialIcons } from "@/components/icons";
import { profile, socials, targetRoles } from "@/lib/data";

export function Contact() {
  const activeSocials = socials.filter((social) => social.href.trim() !== "");

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      description="I am open to developer roles in Bangkok, Chonburi, or remote. Drop me a line and I will reply."
    >
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <h3 className="text-xs font-medium uppercase tracking-wider text-subtle">
            Roles I am open to
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
                href={`mailto:${profile.email}`}
                className="group flex items-start gap-3"
              >
                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-subtle">
                    Email
                  </span>
                  <span className="mt-0.5 block text-sm text-fg underline-offset-4 group-hover:underline">
                    {profile.email}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phoneHref}`}
                className="group flex items-start gap-3"
              >
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-subtle">
                    Phone
                  </span>
                  <span className="mt-0.5 block text-sm text-fg underline-offset-4 group-hover:underline">
                    {profile.phone}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
              <span>
                <span className="block text-xs font-medium uppercase tracking-wider text-subtle">
                  Location
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
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
