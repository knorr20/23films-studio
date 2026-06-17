import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { WorkFilters } from "@/components/WorkFilters";
import { ContactCta } from "@/components/ContactCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Commercial, music video, and narrative work from 23 Production.",
};

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

function parseCategory(param?: string): ProjectCategory | "all" {
  if (param && PROJECT_CATEGORIES.includes(param as ProjectCategory)) {
    return param as ProjectCategory;
  }
  return "all";
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const category = parseCategory(params.category);

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
