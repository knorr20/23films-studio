"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { formatProjectMeta } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  showMetaBelow?: boolean;
}

export function ProjectCard({ project, showMetaBelow = true }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  };

  const handleLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <article className="group">
      <Link
        href={`/work/${project.slug}`}
        className="block"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        <div className="project-card-media relative aspect-video overflow-hidden bg-bg-elevated">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {project.previewVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[600ms] group-hover:opacity-100"
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={project.previewVideo} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-overlay opacity-0 transition-opacity duration-[600ms] group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-[600ms] group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-nav text-text">{project.title}</p>
            {project.subtitle && (
              <p className="mt-1 text-[12px] text-text-muted">{project.subtitle}</p>
            )}
          </div>
        </div>

        {showMetaBelow && (
          <div className="mt-3 flex flex-col gap-1">
            <p className="text-nav text-text">{project.title}</p>
            <p className="text-caption">{formatProjectMeta(project)}</p>
          </div>
        )}
      </Link>
    </article>
  );
}
