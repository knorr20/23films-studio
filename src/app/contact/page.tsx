import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { contactIntro, siteConfig } from "@/data/site";
import { ScrollReveal, LineReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for commercial video production inquiries.`,
};

export default function ContactPage() {
  return (
    <section className="section-padding pt-32 md:pt-40">
      <div className="max-content grid gap-16 lg:grid-cols-2">
        <div>
          <ScrollReveal>
            <p className="text-caption mb-4">Contact</p>
            <h1 className="font-display text-4xl text-display text-text md:text-6xl">
              Start a Project
            </h1>
          </ScrollReveal>

          <LineReveal className="my-12" />

          <div className="space-y-6">
            {contactIntro.map((paragraph) => (
              <ScrollReveal key={paragraph.slice(0, 32)}>
                <p className="text-base leading-relaxed text-text-muted">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 space-y-3 text-base">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-text transition-opacity hover:opacity-70"
              >
                {siteConfig.email}
              </a>
              {siteConfig.phones.map((phone, i) => (
                <a
                  key={phone}
                  href={`tel:${siteConfig.phoneLinks[i]}`}
                  className="block text-text-muted transition-opacity hover:text-text"
                >
                  {phone}
                </a>
              ))}
              <div className="flex flex-wrap gap-4 pt-4 text-nav">
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text"
                >
                  WhatsApp
                </a>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text"
                >
                  Telegram
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text"
                >
                  Instagram
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100}>
          <ContactForm />
        </ScrollReveal>
      </div>

      <div className="max-content mt-20 border-t border-border pt-8">
        <Link href="/work" className="text-nav link-arrow text-text-muted">
          View our work →
        </Link>
      </div>
    </section>
  );
}
