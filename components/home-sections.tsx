import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import type { Content } from "@/lib/content";

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
  content,
  stack,
  resume,
}: {
  content: Content;
  /** Optional role-specific stack; the default page keeps this in Skills. */
  stack?: string[];
  /** The CV in the hero; omitted on the default page, which sends the dev one. */
  resume?: string;
}) {
  return (
    <>
      <Hero content={content} stack={stack} resume={resume} />
      <Projects content={content} />
      <About content={content} />
      <ExperienceSection content={content} />
      <Skills content={content} />
      <Contact content={content} />
    </>
  );
}
