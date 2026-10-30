"use client";

import { usePathname } from "next/navigation";
import type { NavItem, UiCopy } from "@/lib/content/types";
import { identity, socials } from "@/lib/content/shared";
import { sectionHref, variantPrefix, type Locale } from "@/lib/i18n";
import { DocumentIcon, ExternalLinkIcon } from "@/components/icons";
import { SectionLink } from "@/components/section-link";

type FooterCopy = Pick<UiCopy, "footerNavLabel" | "footer">;

/**
 * The Contact section sits directly above, with the address and the same
 * socials, so the footer does not repeat the address: it links to that section
 * instead, and adds the CV, which the hero is otherwise the only way to.
 *
 * `resumes` is keyed by `variantPrefix`, because this footer lives in the
 * layout and a variant page carries a different CV from the default one.
 */
export function SiteFooter({ locale, ui, navigation, name, role, resumes }: {
  locale: Locale;
  ui: FooterCopy;
  navigation: NavItem[];
  name: string;
  role: string;
  resumes: Record<string, string>;
}) {
  const pathname = usePathname() ?? "/";
  const resume = resumes[variantPrefix(pathname)] ?? resumes[""];
  return (
    <footer className="site-footer no-print">
      <div className="page-wrap">
        <div className="footer-top">
          <div className="footer-identity">
            <div className="footer-brand">
              <span className="footer-monogram" aria-hidden="true">{identity.initials}</span>
              <p className="footer-name">{name}</p>
            </div>
            <p className="footer-role">{role}</p>
          </div>
          <div className="footer-link-group">
            <h2>{ui.footer.navigationHeading}</h2>
            <nav aria-label={ui.footerNavLabel}>
              {navigation.map((item) => (
                <SectionLink key={item.hash} href={sectionHref(pathname, locale, item.hash)}>{item.label}</SectionLink>
              ))}
              <SectionLink href={sectionHref(pathname, locale, "#contact")}>{ui.footer.contact}</SectionLink>
            </nav>
          </div>
          <div className="footer-link-group">
            <h2>{ui.footer.socialsHeading}</h2>
            <div className="footer-socials">
              <a href={resume} target="_blank" rel="noreferrer noopener" aria-label={ui.footer.resumeLinkLabel}>
                {ui.footer.resume}<DocumentIcon />
              </a>
              {socials.filter((social) => social.href.trim()).map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">{social.label}<ExternalLinkIcon /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {name}</p>
          <p>{ui.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
