import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getContent, getProject, getProjectSlugs } from "@/lib/content";
import { isLocale, localePath, localeTags, locales } from "@/lib/i18n";

/**
 * Generated bottom-up: this page owns both dynamic segments, so it returns the
 * full cross product of languages and projects rather than leaving the locale
 * to the layout.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

function languageAlternates(slug: string) {
  return Object.fromEntries(
    locales.map((locale) => [
      localeTags[locale],
      localePath(locale, `/projects/${slug}`),
    ]),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const { ui, profile } = getContent(locale);
  const project = getProject(locale, slug);

  if (!project) {
    return { title: ui.project.notFoundTitle };
  }

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: localePath(locale, `/projects/${project.slug}`),
      languages: languageAlternates(project.slug),
    },
    openGraph: {
      type: "article",
      url: localePath(locale, `/projects/${project.slug}`),
      title: `${project.title} — ${profile.name}`,
      description: project.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${profile.name}`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProject(locale, slug);
  if (!project) notFound();

  return <ProjectCaseStudy locale={locale} project={project} />;
}
