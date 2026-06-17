import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import { ProjectStills } from "@/components/ProjectStills";
import { PROJECT_CATEGORY_LABELS } from "@/data/projects";
import { siteConfig } from "@/data/site";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.thumbnail, width: 1920, height: 1080 }],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.description,
    thumbnailUrl: project.thumbnail,
    uploadDate: "2026-01-01",
    contentUrl: `https://vimeo.com/${project.vimeoId}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <article className="section-padding pt-32 md:pt-40">
        <div className="max-content">
          <VimeoPlayer vimeoId={project.vimeoId} title={project.title} />

          <div className="mt-12 max-w-3xl">
            <p className="text-caption mb-4">
              {[project.client, PROJECT_CATEGORY_LABELS[project.category]]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <h1 className="font-display text-4xl text-display text-text md:text-6xl">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mt-4 text-lg text-text-muted">{project.subtitle}</p>
            )}
            <p className="mt-8 max-w-xl text-base leading-relaxed text-text-muted">
              {project.description}
            </p>
          </div>

          {project.stills && project.stills.length > 0 && (
            <ProjectStills images={project.stills} title={project.title} />
          )}

          <nav
            className="mt-16 flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row"
            aria-label="Project navigation"
          >
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="text-nav text-text-muted transition-colors hover:text-text"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="text-nav text-text-muted transition-colors hover:text-text sm:text-right"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <p className="mt-12 text-nav">
            <Link href="/contact" className="link-arrow text-text-muted hover:text-text">
              Start a project with 23 Production →
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
