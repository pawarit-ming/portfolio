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
  resume,
  basePath = "",
}: {
  locale: Locale;
  content: Content;
  /** Optional role-specific stack; the default page keeps this in Skills. */
  stack?: string[];
  /** The CV in the hero; omitted on the default page, which sends the dev one. */
  resume?: string;
  /**
   * `""` on the default page, `"/for/dba"` on a variant — so the project cards
   * link to the case study inside the world the reader is already in.
   */
  basePath?: string;
}) {
  return (
    <>
      <Hero content={content} stack={stack} resume={resume} />
      <About content={content} />
      <Projects locale={locale} content={content} basePath={basePath} />
      <ExperienceSection locale={locale} content={content} basePath={basePath} />
      <Skills content={content} locale={locale} basePath={basePath} />
      <Contact content={content} />
    </>
  );
}
