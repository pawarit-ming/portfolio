import { notFound } from "next/navigation";
import { HomeSections } from "@/components/home-sections";
import {
  getContent,
  identity,
  knowsAbout,
  postalAddress,
} from "@/lib/content";
import { isLocale, localePath, localeTags, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const { profile, education, certifications, targetRoles } = content;

  /** Structured data so search engines and recruiters' tools read the profile correctly. */
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    // The other spelling of the same person, so a search engine can tell that
    // ปวริศ ว่อง and Pawarit Wang are one profile rather than two.
    alternateName: locales
      .filter((other) => other !== locale)
      .map((other) => getContent(other).profile.name),
    jobTitle: targetRoles.map((role) => role.label),
    email: `mailto:${identity.email}`,
    telephone: identity.phone,
    // Each language version points at its own URL, so the two pages do not
    // claim to be the same resource.
    url: `${siteUrl}${localePath(locale)}`,
    inLanguage: localeTags[locale],
    address: {
      "@type": "PostalAddress",
      ...postalAddress,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    // The certificates listed in the About card, so a parser reads them as
    // credentials rather than three more links. `url` is the PDF itself —
    // absolute, because structured data is consumed away from this page.
    hasCredential: certifications.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.name,
      credentialCategory: "certificate",
      url: `${siteUrl}${certification.file}`,
      recognizedBy: {
        "@type": "Organization",
        name: certification.issuer,
      },
    })),
    knowsAbout,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Content is a constant defined above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HomeSections locale={locale} content={content} />
    </>
  );
}
