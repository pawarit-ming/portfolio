"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

/**
 * A link to a section of the homepage. A click on the hash the URL already
 * ends in (land on /en#projects, scroll up, click "Projects" again) is
 * swallowed by the router, so a same-page hash scrolls itself; the href stays
 * a real anchor for no-script and new-tab use. Anything else goes through `Link`.
 */
export function SectionLink({ href, onClick, ...props }: ComponentProps<"a"> & { href: string }) {
  if (!href.startsWith("#")) return <Link href={href} onClick={onClick} {...props} />;

  const scroll = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const target = document.getElementById(href.slice(1));
    if (event.defaultPrevented || !target || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    // Smooth or instant follows the page's own scroll-behavior (and reduced motion).
    target.scrollIntoView();
    if (location.hash !== href) history.pushState(null, "", href);
  };

  return <a href={href} onClick={scroll} {...props} />;
}
