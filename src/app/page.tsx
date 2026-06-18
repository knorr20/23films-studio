import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { TrustedClients } from "@/components/TrustedClients";
import { ContactCta } from "@/components/ContactCta";
import { ScrollReveal, LineReveal } from "@/components/ScrollReveal";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />

      <section className="section-padding">
        <div className="max-content">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-caption mb-4">Portfolio</p>
                <h2 className="font-display text-3xl text-display text-text md:text-5xl">
                  Work
                </h2>
              </div>
              <Link href="/work" className="text-nav link-arrow text-text-muted">
                Browse by category →
              </Link>
            </div>
          </ScrollReveal>
          <LineReveal className="mb-12" />
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <TrustedClients />
      <ContactCta />
    </>
  );
}
