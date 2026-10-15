import { getContent, getProjectSlugs, variants } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n";
import { ogSize } from "@/lib/og";
import ProjectImage from "../../../../projects/[slug]/opengraph-image";

/**
 * The same card as the default case study: a variant changes how the homepage
 * introduces me, not what the work was. Written out rather than re-exported so
 * Next can read `alt`, `size` and `contentType` from this file itself.
 */

export const alt = `Project case study by ${getContent(defaultLocale).profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return variants.flatMap((variant) =>
    getProjectSlugs().map((slug) => ({ variant, slug })),
  );
}

export default function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; variant: string; slug: string }>;
}) {
  return ProjectImage({ params });
}
