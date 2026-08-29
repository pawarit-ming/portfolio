import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-6 py-28 lg:px-8">
      <p className="font-mono text-sm text-subtle">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The link may be out of date, or the page may have moved. Everything else
        is still where you left it.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to the homepage
      </Link>
    </div>
  );
}
