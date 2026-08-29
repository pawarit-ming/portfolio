import Link from "next/link";
import { navigation, profile, socials } from "@/lib/data";
import { socialIcons } from "@/components/icons";

export function SiteFooter() {
  const activeSocials = socials.filter((social) => social.href.trim() !== "");

  return (
    <footer className="no-print border-t border-line bg-card">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-fg">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">{profile.role}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block text-sm text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-col gap-6 sm:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {activeSocials.length > 0 ? (
              <ul className="flex gap-2">
                {activeSocials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
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
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js,
            TypeScript and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
