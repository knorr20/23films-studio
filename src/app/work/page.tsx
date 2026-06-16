import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { WorkFilters } from "@/components/WorkFilters";
import { ContactCta } from "@/components/ContactCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { ProjectCategory } from "@/data/projects";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Commercial, automotive, luxury real estate, and branded content from 23 Production.",
};

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const categoryParam = params.category;
  const category: ProjectCategory | "all" =
    categoryParam === "video" ||
    categoryParam === "photo" ||
    categoryParam === "bts"
      ? categoryParam
      : "all";

  const filtered = getProjectsByCategory(category);

  return (
    <>
      <section className="section-padding pt-32 md:pt-40">
        <div className="max-content">
          <ScrollReveal>
            <p className="text-caption mb-4">Portfolio</p>
            <h1 className="font-display text-4xl text-display text-text md:text-6xl">
              Work
            </h1>
          </ScrollReveal>

          <div className="mt-12">
            <Suspense fallback={<div className="h-10" />}>
              <WorkFilters active={category} />
            </Suspense>
          </div>

          <div className="mt-12">
            <ProjectGrid projects={filtered} />
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
