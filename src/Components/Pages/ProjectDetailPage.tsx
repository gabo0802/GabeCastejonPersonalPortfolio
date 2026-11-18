import React, { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { usePortfolioData } from "../../Data/DataProvider";
import type { MediaItem } from "../../Data/types";
import { isImage, isVideo, isYouTubeUrl, toYouTubeEmbedUrl } from "../../Utils/media";
import ProjectCard from "../ProjectCard";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, GitHub } from "../ui/Icons";
import SkillChip from "../ui/SkillChip";

function GalleryMedia({ media, index }: { media: MediaItem; index: number }) {
  const label = media.caption ?? `Gallery item ${index + 1}`;
  const type = media.type ?? (isVideo(media.url) ? "video" : "image");

  if (isYouTubeUrl(media.url)) {
    return (
      <iframe
        className="aspect-video w-full"
        src={toYouTubeEmbedUrl(media.url)}
        title={label}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }
  if (type === "video" || !isImage(media.url)) {
    return <video className="max-h-full max-w-full" src={media.url} controls preload="metadata" />;
  }
  return <img src={media.url} alt={label} loading="lazy" className="max-h-full max-w-full object-contain" />;
}

function Gallery({ items }: { items: MediaItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="mt-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Gallery</h2>
        {items.length > 1 && (
          <div className="flex gap-2">
            <button type="button" className="icon-btn" onClick={() => scroll(-1)} aria-label="Previous image">
              <ChevronLeft />
            </button>
            <button type="button" className="icon-btn" onClick={() => scroll(1)} aria-label="Next image">
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        {items.map((media, index) => (
          <figure
            key={`${media.url}-${index}`}
            className="card w-[88%] shrink-0 snap-start overflow-hidden sm:w-[75%] lg:w-[62%]"
          >
            <div className="flex aspect-video items-center justify-center bg-surface-2 p-3">
              <GalleryMedia media={media} index={index} />
            </div>
            {media.caption && (
              <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">{media.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = usePortfolioData();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <article className="container-page pb-24 pt-10 sm:pt-14">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft size={15} /> All projects
      </Link>

      <div className="route-fade mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>

          {(project.links?.demo || project.links?.repo) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.links?.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn-primary">
                  Live demo <ArrowUpRight size={15} />
                </a>
              )}
              {project.links?.repo && (
                <a href={project.links.repo} target="_blank" rel="noreferrer" className="btn-secondary">
                  <GitHub size={15} /> Source code
                </a>
              )}
            </div>
          )}

          {project.tech && project.tech.length > 0 && (
            <div className="mt-10">
              <p className="eyebrow mb-3">Built with</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((skill) => (
                  <SkillChip key={skill.slug} skill={skill} />
                ))}
              </div>
            </div>
          )}
        </div>

        {project.thumbnail && (
          <div className="card relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface-2">
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(70% 60% at 50% 40%, rgb(var(--accent) / 0.12), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="relative max-h-[80%] max-w-[85%] object-contain drop-shadow-2xl"
            />
          </div>
        )}
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
        <p className="mt-4 whitespace-pre-line leading-relaxed text-muted">{project.description}</p>
      </section>

      {project.gallery && project.gallery.length > 0 && <Gallery items={project.gallery} />}

      {others.length > 0 && (
        <section className="mt-24 border-t border-line pt-12">
          <h2 className="mb-6 text-xl font-semibold tracking-tight">More projects</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
