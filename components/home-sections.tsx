import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * The homepage body, shared by the default page and the role variants at
 * `/[locale]/for/[variant]`.
 *
 * The variant pages differ only in the content handed to them, so the section
 * order lives here once. The Person JSON-LD deliberately does not: it belongs
 * to the canonical page, and a `noindex` variant emitting a second copy of the
 * same person would be structured data with nothing to read it.
 */
export function HomeSections({
  locale,
  content,
  stack,
  basePath = "",
}: {
  locale: Locale;
  content: Content;
  /** Hero chips; omitted on the default page, which uses the shared list. */
  stack?: string[];
  /**
   * `""` on the default page, `"/for/dba"` on a variant — so the project cards
   * link to the case study inside the world the reader is already in.
   */
  basePath?: string;
}) {
  return (
    <>
      {/* No `locale`: the hero's own links are bare hashes, because every
          route that renders this component has the sections on it. */}
      <Hero content={content} stack={stack} />
      <About content={content} />
      <ExperienceSection locale={locale} content={content} basePath={basePath} />
      <Projects locale={locale} content={content} basePath={basePath} />
      <Skills content={content} />
      <Contact content={content} />
    </>
  );
}
