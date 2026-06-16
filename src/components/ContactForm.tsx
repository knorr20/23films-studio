"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="max-w-lg text-text-muted">
        Your email client should open shortly. If it doesn&apos;t, write to{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-text underline">
          {siteConfig.email}
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-8">
      <label className="flex flex-col gap-2">
        <span className="text-caption">Name</span>
        <input
          type="text"
          name="name"
          required
          className="border-b border-border bg-transparent py-3 text-text outline-none transition-colors focus:border-text"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption">Email</span>
        <input
          type="email"
          name="email"
          required
          className="border-b border-border bg-transparent py-3 text-text outline-none transition-colors focus:border-text"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none border-b border-border bg-transparent py-3 text-text outline-none transition-colors focus:border-text"
        />
      </label>
      <button type="submit" className="w-fit text-nav link-arrow text-text">
        Send Message →
      </button>
    </form>
  );
}
