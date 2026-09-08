import Link from "next/link";
import type { Content } from "@/lib/content";
import { documents, identity, primaryStack, socials } from "@/lib/content";
import {
  ArrowRightIcon,
  DocumentIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  socialIcons,
} from "@/components/icons";

export function Hero({
  content,
  /**
   * The chips under the headline. Defaults to the shared list; a role variant
   * passes its own, because six frontend frameworks sitting under a line about
   * schema design undercuts the sentence above them.
   */
  stack = primaryStack,
  /**
   * The CV behind the red button. Defaults to the development one; a role
   * variant passes the CV that goes out with its own applications, so the page
   * and the document attached to the same application say the same thing.
   */
  resume = documents.resume,
}: {
  content: Content;
  stack?: string[];
  resume?: string;
}) {
  const { profile, targetRoles, ui } = content;
  const activeSocials = socials.filter((social) => social.href.trim() !== "");

  return (
    <section className="relative overflow-hidden bg-card">
      {/* Faint grid, purely decorative, fades out before it reaches the text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-muted">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-success"
          />
          {profile.availability}
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
          {profile.name}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          <span className="font-medium text-fg">{profile.role}.</span>{" "}
          {profile.headline}
        </p>

        {/* Thai puts no word after the list, so the suffix is allowed to be
            empty and the space before it is dropped rather than left hanging. */}
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-subtle">
          <span>{ui.hero.openToPrefix}</span>{" "}
          {targetRoles.map((role, index) => (
            <span key={role.label}>
              {index > 0 ? (
                <span aria-hidden className="text-faint">
                  {" · "}
                </span>
              ) : null}
              <span className="text-body">{role.short}</span>
            </span>
          ))}
          {ui.hero.openToSuffix ? <span> {ui.hero.openToSuffix}</span> : null}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
          >
            {ui.hero.viewProjects}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {/* The CV sits between the two, not after them: someone who came here
              from an application is looking for it, and it belongs with "View
              projects" — both are "show me the work" — rather than after the
              contact button, which is the end of the sequence.

              Solid PDF red, and the only colour on the page. Given the same
              outline as "Get in touch" it was the same button twice, and the
              one people arrive looking for lost the row.

              Filled, so it outweighs the black "View projects" beside it —
              deliberately. That button leads somewhere on this page, and a
              visitor who misses it scrolls into the work anyway; the CV is the
              one thing here that cannot be reached any other way, and it is
              what someone arriving from an application came for.

              A plain <a>, not next/link: the target is a file in `public/`,
              not a route, so there is nothing for the router to prefetch. */}
          <a
            href={resume}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={ui.hero.resumeLinkLabel}
            className="inline-flex items-center gap-2 rounded-md bg-pdf px-4 py-2.5 text-sm font-medium text-on-pdf transition-colors hover:bg-pdf-hover"
          >
            <DocumentIcon className="h-4 w-4" />
            {ui.hero.resume}
          </a>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-card px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-stronger hover:bg-surface"
          >
            {ui.getInTouch}
          </Link>

          {activeSocials.length > 0 ? (
            <div className="flex gap-2 sm:ml-1">
              {activeSocials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line-strong bg-card text-muted transition-colors hover:border-line-stronger hover:text-fg"
                  >
                    <span className="sr-only">{social.label}</span>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <li className="inline-flex items-center gap-2">
            <PinIcon className="h-4 w-4 text-faint" />
            {profile.location}
          </li>
          <li>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              <MailIcon className="h-4 w-4 text-faint" />
              {identity.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${identity.phoneHref}`}
              className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              <PhoneIcon className="h-4 w-4 text-faint" />
              {identity.phone}
            </a>
          </li>
        </ul>

        <ul className="mt-12 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-line bg-card px-2.5 py-1 font-mono text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {ui.hero.stats.map((stat) => (
            // Reversed so the value sits on top, while the DOM keeps dt before dd.
            // `justify-end` is the top here, because the main axis runs upward:
            // without it a one-line label leaves its value hanging a line below
            // its neighbours', since the cells all stretch to the tallest one.
            <div
              key={stat.label}
              className="flex flex-col-reverse justify-end bg-card px-5 py-6"
            >
              <dt className="mt-1.5 text-sm leading-snug text-muted">
                {stat.label}
              </dt>
              <dd className="text-3xl font-semibold tracking-tight text-fg">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
