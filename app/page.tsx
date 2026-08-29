import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { education, profile, targetRoles } from "@/lib/data";
import { siteUrl } from "@/lib/site";

/** Structured data so search engines and recruiters' tools read the profile correctly. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: targetRoles.map((role) => role.label),
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Si Racha",
    addressRegion: "Chonburi",
    addressCountry: "TH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Flutter",
    "Dart",
    "Frontend Development",
    "Mobile Development",
    "Test Automation",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Content is a constant defined above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <ExperienceSection />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
