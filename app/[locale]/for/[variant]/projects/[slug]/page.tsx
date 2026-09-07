import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getContent, getProject, getProjectSlugs, variants } from "@/lib/content";
import type { Variant } from "@/lib/content";
import { isLocale, localePath, localeTags, locales } from "@/lib/i18n";

/**
 * A case study, reached from inside a role variant.
 *
 * The page itself is the same component the default route renders, from the
 * same content — a variant changes how the homepage introduces me, not what
 * the work was. This route exists so that the links out of a case study lead
 * back to the variant's homepage rather than the default one: without it, one
 * click on "Read the case study" left a reader who arrived at `/en/for/dba`
 * with no way back except the browser's own button, and every link in the
 * header pointing at the page the variant exists to replace.
 *
 * `noindex` and absent from `sitemap.ts`, like the variant homepages: this is
 * the same case study on a second URL, which is duplication as far as a
 * crawler is concerned.
 */

function isVariant(value: string): value is Variant {
  return (variants as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return variants.flatMap((variant) =>
    getProjectSlugs().map((slug) => ({ variant, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/for/[variant]/projects/[slug]">): Promise<Metadata> {
  const { locale, variant, slug } = await params;
  if (!isLocale(locale) || !isVariant(variant)) return {};

  const project = getProject(locale, slug);
  const { ui, profile } = getContent(locale, variant);

  if (!project) return { title: ui.project.notFoundTitle };

  const path = `/for/${variant}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: localePath(locale, path),
      languages: Object.fromEntries(
        locales.map((other) => [localeTags[other], localePath(other, path)]),
      ),
    },
    openGraph: {
      type: "article",
      url: localePath(locale, path),
      title: `${project.title} — ${profile.name}`,
      description: project.tagline,
    },
    robots: { index: false, follow: false },
  };
}

export default async function VariantProjectPage({
  params,
}: PageProps<"/[locale]/for/[variant]/projects/[slug]">) {
  const { locale, variant, slug } = await params;
  if (!isLocale(locale) || !isVariant(variant)) notFound();

  const project = getProject(locale, slug);
  if (!project) notFound();

  return (
    <ProjectCaseStudy
      locale={locale}
      project={project}
      basePath={`/for/${variant}`}
    />
  );
}
