"use client";

import { useState, type FormEvent } from "react";
// Imported from the leaf modules rather than the `@/lib/content` barrel: that
// barrel pulls in every language file, and this is a Client Component.
import { identity } from "@/lib/content/shared";
import type { ContactErrorCode, UiCopy } from "@/lib/content/types";
import { CheckIcon, MailIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";

const fieldClass =
  "block w-full rounded-md border border-line-strong bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors hover:border-line-stronger focus:border-accent focus:outline-none";

const labelClass = "block text-sm font-medium text-fg";

export function ContactForm({ copy }: { copy: UiCopy["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Kept so the fallback can hand the visitor their own draft back as a mailto.
  const [draft, setDraft] = useState({ name: "", message: "" });
  const [copied, setCopied] = useState(false);

  /**
   * The endpoint answers with a code, not a sentence — it has no idea which
   * language the page is in. Anything unrecognised falls back rather than
   * showing a blank box.
   */
  function messageFor(code: unknown): string {
    return (
      copy.errors[code as ContactErrorCode] ?? copy.errors.unknown
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    // Grab the form now: `currentTarget` is cleared once the handler yields.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      // Bots fill this in; humans never see it.
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        code?: ContactErrorCode;
        fallback?: boolean;
      };

      if (!response.ok) {
        // Delivery is broken at my end — mail not configured, or the provider
        // rejected it. Retrying achieves nothing, so hand over the address and
        // the draft rather than a red box. The form is left filled in on purpose.
        if (result.fallback) {
          setDraft({ name: payload.name, message: payload.message });
          setError(messageFor(result.code));
          setStatus("fallback");
          return;
        }

        setError(messageFor(result.code));
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      // The request never completed — offline, or the endpoint is unreachable.
      setError(copy.errors.unknown);
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused outright. The address is printed under
      // the buttons for exactly this case, so there is nothing to recover from.
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success-line bg-success-soft p-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-success-fg">
          <CheckIcon className="h-4 w-4" />
          {copy.successTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-success-fg">
          {copy.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-success-fg underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {copy.sendAnother}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  // A long message can outrun what some mail clients accept in a mailto, which
  // is the other reason the textarea above keeps its contents.
  const mailtoHref = `mailto:${identity.email}?subject=${encodeURIComponent(
    draft.name
      ? copy.mailtoSubjectFrom.replace("{name}", draft.name)
      : copy.mailtoSubject,
  )}&body=${encodeURIComponent(draft.message)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div>
        <label htmlFor="name" className={labelClass}>
          {copy.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {copy.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {copy.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder={copy.messagePlaceholder}
          className={`mt-2 resize-y ${fieldClass}`}
        />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">{copy.companyLabel}</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? copy.submitting : copy.submit}
        </button>
        <p className="text-xs text-subtle">
          {copy.orEmailDirectly}{" "}
          <a
            href={`mailto:${identity.email}`}
            className="text-accent underline underline-offset-4"
          >
            {identity.email}
          </a>
        </p>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="rounded-md border border-danger-line bg-danger-soft px-3.5 py-3 text-sm text-danger-fg"
        >
          {error}
        </p>
      ) : null}

      {status === "fallback" ? (
        <div
          role="alert"
          className="rounded-xl border border-line-strong bg-surface p-5"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-fg">
            <MailIcon className="h-4 w-4 shrink-0 text-faint" />
            {error}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {copy.fallbackBody}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover"
            >
              {copy.openInMailApp}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong bg-card px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-stronger hover:bg-surface"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  {copy.addressCopied}
                </>
              ) : (
                copy.copyAddress
              )}
            </button>
          </div>

          <p className="mt-3 select-all font-mono text-xs text-subtle">
            {identity.email}
          </p>
        </div>
      ) : null}
    </form>
  );
}
