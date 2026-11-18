import React from "react";
import { usePortfolioData } from "../../Data/DataProvider";
import { profile } from "../../Data/profile";
import ProjectCard from "../ProjectCard";
import Reveal from "../ui/Reveal";

export default function ProjectsPage() {
  const { projects } = usePortfolioData();
  const copy = profile.sections.projectsPage;

  return (
    <div className="container-page pb-24 pt-12 sm:pt-20">
      <header className="route-fade max-w-2xl">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{copy.title}</h1>
        {copy.description && <p className="mt-4 text-lg text-muted">{copy.description}</p>}
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
