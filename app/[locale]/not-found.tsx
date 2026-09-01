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

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-6 py-28 lg:px-8">
      <p className="font-mono text-sm text-subtle">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {ui.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        {ui.notFound.description}
      </p>
      <Link
        href={localePath(home)}
        className="group mt-8 inline-flex items-center gap-2 rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {ui.notFound.back}
      </Link>
    </div>
  );
}
