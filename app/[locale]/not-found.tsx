import Link from "next/link";
import { locale as rootLocale } from "next/root-params";
import { ArrowLeftIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { defaultLocale, isLocale, localePath } from "@/lib/i18n";

/**
 * A `not-found.tsx` gets no `params` prop, so the locale comes from
 * `next/root-params` instead — `[locale]` sits above the root layout, which is
 * what makes it a root parameter and readable from any Server Component.
 *
 * The guard is not ceremony: this file also renders when the layout itself
 * rejects a made-up segment like `/de`, and `de` is exactly what the getter
 * returns in that case.
 */
export default async function NotFound() {
  const current = await rootLocale();
  const { ui } = getContent(isLocale(current) ? current : defaultLocale);
  const home = isLocale(current) ? current : defaultLocale;

  // The code at display size, on the same left edge as the header, so the
  // page reads like the rest of the site rather than a stray default.
  return (
    <section className="not-found page-wrap">
      <p className="not-found-code" aria-hidden="true">404</p>
      <h1 className="not-found-title">{ui.notFound.title}</h1>
      <p className="not-found-text">{ui.notFound.description}</p>
      <Link href={localePath(home)} className="primary-action not-found-action">
        <ArrowLeftIcon className="h-4 w-4" />
        {ui.notFound.back}
      </Link>
    </section>
  );
}
