import type { Metadata } from "next";
import { services } from "@/data/services";
import { ScrollReveal, LineReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service video production, podcasts, BTS, post-production, photo sessions, and retouching.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-padding pt-32 md:pt-40">
        <div className="max-content">
          <ScrollReveal>
            <p className="text-caption mb-4">What we do</p>
            <h1 className="font-display text-4xl text-display text-text md:text-6xl">
              Services
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-muted">
              From concept to final delivery — commercial production built for
              brands that need cinematic quality and measurable results.
            </p>
          </ScrollReveal>

          <LineReveal className="my-16" />

          <div className="grid gap-0 md:grid-cols-2">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={(index % 2) * 100}>
                <div className="border-b border-border py-10 pr-0 md:pr-12">
                  <h2 className="font-display text-xl text-display text-text md:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
