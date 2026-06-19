import type { Metadata } from "next";
import Link from "next/link";
import { contactIntro, siteConfig } from "@/data/site";
import { ScrollReveal, LineReveal } from "@/components/ScrollReveal";
import { createPageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSeo.contact);

export default function ContactPage() {
  return (
    <section className="section-padding pt-32 md:pt-40">
      <div className="max-content max-w-3xl">
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
          <div className="mt-12 space-y-8">
            <div>
              <p className="text-caption mb-2">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-lg text-text transition-opacity hover:opacity-70"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <p className="text-caption mb-2">Phone</p>
              {siteConfig.phones.map((phone, i) => (
                <a
                  key={phone}
                  href={`tel:${siteConfig.phoneLinks[i]}`}
                  className="block text-lg text-text transition-opacity hover:opacity-70"
                >
                  {phone}
                </a>
              ))}
            </div>

            <div>
              <p className="text-caption mb-3">Message us</p>
              <div className="flex flex-wrap gap-4 text-nav">
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

            <address className="text-sm not-italic leading-relaxed text-text-muted">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </address>
          </div>
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
