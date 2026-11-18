import React, { useState } from "react";
import { usePortfolioData } from "../../Data/DataProvider";
import { profile } from "../../Data/profile";
import { isCurrentRole, splitSubtitle } from "../../Data/format";
import type { Experience } from "../../Data/types";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { SkillChipList } from "../ui/SkillChip";

const INITIAL_ROLES = 5;

function ExperienceItem({ experience }: { experience: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const { company, details } = splitSubtitle(experience.subtitle);
  const current = isCurrentRole(experience.timeframe);

  return (
    <Reveal as="li" className="group relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-0">
      {/* Rail + dot (mobile: left rail; desktop: rail sits between columns) */}
      <span
        className="absolute bottom-0 left-[5px] top-2 w-px bg-gradient-to-b from-accent/40 to-line group-last:hidden md:left-[calc(11rem+15px)]"
        aria-hidden="true"
      />
      <span
        className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 md:left-[calc(11rem+10px)] ${
          current ? "border-accent bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.8)]" : "border-accent/40 bg-bg"
        }`}
        aria-hidden="true"
      />

      <p className="font-mono text-xs leading-6 text-subtle md:text-right md:pr-6">
        {experience.timeframe}
      </p>

      <div className="md:pl-10">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">{experience.title}</h3>
          {current && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
              Now
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm">
          <span className="font-medium text-fg">{company}</span>
          {details.length > 0 && <span className="text-subtle"> · {details.join(" · ")}</span>}
        </p>

        <p
          className={`mt-3 max-w-3xl text-sm leading-relaxed text-muted ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {experience.description}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-1.5 text-xs font-medium text-subtle transition-colors hover:text-fg"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </button>

        {experience.tech && experience.tech.length > 0 && (
          <div className="mt-4">
            <SkillChipList skills={experience.tech} max={expanded ? undefined : 7} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function ExperienceTimeline() {
  const { experiences } = usePortfolioData();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? experiences : experiences.slice(0, INITIAL_ROLES);
  const hiddenCount = experiences.length - visible.length;

  return (
    <section id="experience" className="container-page scroll-mt-20 py-20 md:py-28">
      <SectionHeading {...profile.sections.experience} />
      <ol className="relative">
        {visible.map((experience) => (
          <ExperienceItem key={experience.slug} experience={experience} />
        ))}
      </ol>
      {hiddenCount > 0 && (
        <div className="mt-10 md:pl-[calc(11rem+4.5rem)]">
          <button type="button" className="btn-secondary" onClick={() => setShowAll(true)}>
            Show {hiddenCount} earlier {hiddenCount === 1 ? "role" : "roles"}
          </button>
        </div>
      )}
    </section>
  );
}
