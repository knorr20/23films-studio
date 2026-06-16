import Link from "next/link";
import { siteConfig } from "@/data/site";
import { LineReveal } from "@/components/ScrollReveal";

export function ContactCta() {
  return (
    <section className="section-padding border-t border-border">
      <div className="max-content">
        <LineReveal />
        <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-caption mb-4">Get in touch</p>
            <h2 className="font-display text-3xl text-display text-text md:text-5xl">
              Let&apos;s Create Something
            </h2>
          </div>
          <div className="flex flex-col gap-3 text-base text-text-muted">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-opacity hover:text-text"
            >
              {siteConfig.email}
            </a>
            {siteConfig.phones.map((phone, i) => (
              <a
                key={phone}
                href={`tel:${siteConfig.phoneLinks[i]}`}
                className="transition-opacity hover:text-text"
              >
                {phone}
              </a>
            ))}
            <Link href="/contact" className="mt-2 text-nav link-arrow text-text">
              Start a Project →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
