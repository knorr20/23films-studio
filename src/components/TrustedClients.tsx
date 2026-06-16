import { trustedClients } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";

export function TrustedClients() {
  return (
    <section className="section-padding border-t border-border">
      <div className="max-content">
        <ScrollReveal>
          <p className="text-caption mb-10">Trusted by</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
            {trustedClients.map((client) => (
              <li
                key={client}
                className="font-display text-sm text-display text-text-subtle transition-colors duration-300 hover:text-text md:text-base"
              >
                {client}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
