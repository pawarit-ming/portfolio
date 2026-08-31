import Link from "next/link";
import { profile, socials, targetRoles } from "@/lib/data";
import {
  ArrowRightIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  socialIcons,
} from "@/components/icons";

const primaryStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Flutter",
  "Dart",
];

// One stat per direction I am applying in: web, mobile, and test automation.
const stats = [
  { value: "22", label: "Production web screens shipped in an internship" },
  { value: "25+", label: "Screens in a cross-platform Flutter app" },
  {
    value: "Appium",
    label: "Android suite automated in Java, reported with Extent Reports",
  },
];

export function Hero() {
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

      <div className="relative mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:px-8">
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

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-subtle">
          <span>Open to</span>{" "}
          {targetRoles.map((role, index) => (
            <span key={role.label}>
              {index > 0 ? (
                <span aria-hidden className="text-faint">
                  {" · "}
                </span>
              ) : null}
              <span className="text-body">{role.short}</span>
            </span>
          ))}{" "}
          <span>roles</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
          >
            View projects
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-card px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-stronger hover:bg-surface"
          >
            Get in touch
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
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              <MailIcon className="h-4 w-4 text-faint" />
              {profile.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${profile.phoneHref}`}
              className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              <PhoneIcon className="h-4 w-4 text-faint" />
              {profile.phone}
            </a>
          </li>
        </ul>

        <ul className="mt-12 flex flex-wrap gap-2">
          {primaryStack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-line bg-card px-2.5 py-1 font-mono text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {stats.map((stat) => (
            // Reversed so the value sits on top, while the DOM keeps dt before dd.
            <div
              key={stat.label}
              className="flex flex-col-reverse bg-card px-5 py-6"
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
