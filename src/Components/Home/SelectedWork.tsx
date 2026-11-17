import React from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../../Data/DataProvider";
import { profile } from "../../Data/profile";
import ProjectCard from "../ProjectCard";
import { ArrowRight } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function SelectedWork() {
  const { projects } = usePortfolioData();
  const selected = projects.slice(0, 4);

  return (
    <section className="border-y border-line bg-surface/40">
      <div className="container-page py-20 md:py-28">
        <SectionHeading
          {...profile.sections.selectedWork}
          action={
            <Link to="/projects" className="btn-secondary self-start sm:self-auto">
              View all <ArrowRight size={15} />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {selected.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} featured />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
