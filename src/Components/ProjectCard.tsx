import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../Data/types";
import { ArrowUpRight } from "./ui/Icons";
import { SkillChipList } from "./ui/SkillChip";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group card flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-accent/50 hover:shadow-[0_8px_40px_-12px_rgb(var(--accent)/0.35)]"
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden border-b border-line bg-surface-2 ${
          featured ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 40%, rgb(var(--accent) / 0.10), transparent 70%)",
          }}
          aria-hidden="true"
        />
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            className="relative max-h-[78%] max-w-[82%] object-contain drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="relative text-sm text-subtle">{project.title}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
          />
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        {project.tech && project.tech.length > 0 && (
          <div className="mt-auto pt-2">
            <SkillChipList skills={project.tech} max={featured ? 5 : 3} />
          </div>
        )}
      </div>
    </Link>
  );
}
