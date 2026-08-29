"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import { CheckIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "block w-full rounded-md border border-line-strong bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors hover:border-line-stronger focus:border-accent focus:outline-none";

const labelClass = "block text-sm font-medium text-fg";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success-line bg-success-soft p-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-success-fg">
          <CheckIcon className="h-4 w-4" />
          Message sent
        </p>
        <p className="mt-2 text-sm leading-relaxed text-success-fg">
          Thanks for reaching out — I will get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-success-fg underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="you@company.com"
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Tell me about the role or the project."
          className={`mt-2 resize-y ${fieldClass}`}
        />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-md bg-invert px-4 py-2.5 text-sm font-medium text-on-invert transition-colors hover:bg-invert-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-subtle">
          Or email me directly at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-accent underline underline-offset-4"
          >
            {profile.email}
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
    </form>
  );
}
