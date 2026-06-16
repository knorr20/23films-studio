import { trustedClients } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";

export function TrustedClients() {
  return (
    <section className="section-padding border-t border-border">
      <div className="max-content">
        <ScrollReveal>
          <p className="text-caption mb-8">Trusted by</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {trustedClients.map((client) => (
              <span
                key={client}
                className="font-display text-lg text-display text-text-subtle transition-colors duration-300 hover:text-text-muted md:text-xl"
              >
                {client}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
