import { notFound } from "next/navigation";

/**
 * Catches every path under a language that matches nothing else and hands it to
 * `not-found.tsx`.
 *
 * Without this, `/th/nope` matches no route at all and Next falls back to its
 * built-in 404 — a bare page with no header, no footer, and no language. The
 * catch-all is the lowest-priority match in the router, so real routes such as
 * `/th/projects/[slug]` are unaffected.
 */
export default function CatchAll(): never {
  notFound();
}
