import { NextResponse } from "next/server";
import { identity } from "@/lib/content/shared";
import type { ContactErrorCode } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

/**
 * Per-instance rate limiting. On serverless this resets with each cold start,
 * so treat it as a speed bump rather than a guarantee — the honeypot below
 * catches the rest of the low-effort traffic.
 */
const buckets = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );

  if (recent.length >= RATE_MAX) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);
  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * `??` only guards against null and undefined, so an env var that exists but is
 * empty — trivially created by leaving a field blank in a hosting dashboard —
 * would beat the fallback and address the mail to "". `lib/site.ts` documents
 * the same trap for the canonical URL; here it costs every enquiry.
 */
function fromEnv(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

/**
 * The site is bilingual and this endpoint is not — it has no reliable way to
 * know which language the visitor is reading. So it names the failure with a
 * code the form looks up, and keeps the English sentence alongside it for
 * anyone reading the response in a terminal or a server log.
 *
 * `fallback` marks the failures where retrying is pointless because delivery is
 * broken at our end; the form then offers the mailto instead.
 */
function fail(
  code: ContactErrorCode,
  error: string,
  status: number,
  fallback = false,
) {
  return NextResponse.json(
    fallback ? { code, error, fallback } : { code, error },
    { status },
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return fail("invalid_body", "Invalid request body.", 400);
  }

  const { name, email, message, company } = (body ?? {}) as Record<
    string,
    unknown
  >;

  // Honeypot — a real person never sees this field, so anything in it is a bot.
  // Return 200 so the bot has no signal that it was caught.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return fail("missing_fields", "Name, email and message are all required.", 400);
  }

  if (
    cleanName.length > MAX_NAME ||
    cleanEmail.length > MAX_EMAIL ||
    cleanMessage.length > MAX_MESSAGE
  ) {
    return fail("too_long", "That message is too long.", 400);
  }

  if (!EMAIL_PATTERN.test(cleanEmail)) {
    return fail("invalid_email", "That email address does not look right.", 400);
  }

  if (isRateLimited(clientKey(request))) {
    return fail(
      "rate_limited",
      "Too many messages just now. Please try again in a minute.",
      429,
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = fromEnv(process.env.CONTACT_TO_EMAIL, identity.email);
  const from = fromEnv(
    process.env.CONTACT_FROM_EMAIL,
    "Portfolio <onboarding@resend.dev>",
  );

  if (!apiKey) {
    // Better to say so plainly than to fake a success the owner never receives.
    console.warn(
      "[contact] RESEND_API_KEY is not set — the message was not delivered.",
    );
    return fail(
      "not_configured",
      "Email delivery is not configured on this deployment.",
      503,
      true,
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: cleanEmail,
        subject: `Portfolio enquiry from ${cleanName}`,
        html: [
          `<p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>`,
          `<p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>`,
          `<p><strong>Message:</strong></p>`,
          `<p style="white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>`,
        ].join(""),
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[contact] Resend rejected the request:", response.status, detail);
      return fail(
        "provider_rejected",
        "The mail service rejected the message.",
        502,
        true,
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected failure:", error);
    return fail("delivery_failed", "The message could not be delivered.", 500, true);
  }
}
