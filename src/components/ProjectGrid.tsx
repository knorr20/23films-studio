import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ProjectGridProps {
  projects: Project[];
  showMetaBelow?: boolean;
}

export function ProjectGrid({ projects, showMetaBelow = true }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-0.5 md:grid-cols-2">
      {projects.map((project, index) => (
        <ScrollReveal key={project.slug} delay={index % 2 === 0 ? 0 : 100}>
          <ProjectCard project={project} showMetaBelow={showMetaBelow} />
        </ScrollReveal>
      ))}
    </div>
  );
}
