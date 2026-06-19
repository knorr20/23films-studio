import type { Metadata } from "next";
import { aboutParagraphs, siteConfig } from "@/data/site";
import { ScrollReveal, LineReveal } from "@/components/ScrollReveal";
import { createPageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(pageSeo.about);

export default function AboutPage() {
  return (
    <>
      <section className="section-padding pt-32 md:pt-40">
        <div className="max-content">
          <ScrollReveal>
            <p className="text-caption mb-4">Who we are</p>
            <h1 className="font-display text-4xl text-display text-text md:text-6xl">
              {siteConfig.companyName}
            </h1>
          </ScrollReveal>

          <LineReveal className="my-16" />

          <div className="max-w-2xl space-y-8">
            {aboutParagraphs.map((paragraph) => (
              <ScrollReveal key={paragraph.slice(0, 32)}>
                <p className="text-base leading-relaxed text-text-muted">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-16 border-t border-border pt-8">
              <p className="text-caption mb-2">Studio</p>
              <address className="text-base not-italic leading-relaxed text-text">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.region}{" "}
                {siteConfig.address.postalCode}
              </address>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
