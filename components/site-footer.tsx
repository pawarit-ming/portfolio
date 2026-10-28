"use client";

import { usePathname } from "next/navigation";
import type { NavItem, UiCopy } from "@/lib/content/types";
import { identity, socials } from "@/lib/content/shared";
import { sectionHref, type Locale } from "@/lib/i18n";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { SectionLink } from "@/components/section-link";

type FooterCopy = Pick<UiCopy, "footerNavLabel" | "footer">;

export function SiteFooter({ locale, ui, navigation, name, role }: {
  locale: Locale;
  ui: FooterCopy;
  navigation: NavItem[];
  name: string;
  role: string;
}) {
  const pathname = usePathname() ?? "/";
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
            <a className="footer-email" href={`mailto:${identity.email}`}><span>{identity.email}</span><ArrowRightIcon /></a>
          </div>
          <div className="footer-link-group">
            <h2>{ui.footer.navigationHeading}</h2>
            <nav aria-label={ui.footerNavLabel}>
              {navigation.map((item) => (
                <SectionLink key={item.hash} href={sectionHref(pathname, locale, item.hash)}>{item.label}</SectionLink>
              ))}
            </nav>
          </div>
          <div className="footer-link-group">
            <h2>{ui.footer.socialsHeading}</h2>
            <div className="footer-socials">
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
