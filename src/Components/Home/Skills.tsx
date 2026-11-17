import React, { useMemo, useState } from "react";
import { usePortfolioData } from "../../Data/DataProvider";
import { profile } from "../../Data/profile";
import { Proficiency, proficiencyRank, Skill } from "../../Data/types";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SkillChip, { brandColor } from "../ui/SkillChip";

const categoryOrder = [
  "Back-End",
  "Front-End",
  "Database",
  "DevOps",
  "AI Tools",
  "Version Control",
  "IDEs",
  "Project Management",
  "Other Tools",
  "Operating Systems",
];

const coreCategories = new Set(["Back-End", "Front-End", "Database", "DevOps", "AI Tools"]);

const byRankThenName = (a: Skill, b: Skill) =>
  proficiencyRank[b.proficiency] - proficiencyRank[a.proficiency] || a.name.localeCompare(b.name);

export default function Skills() {
  const { skills } = usePortfolioData();
  const [showAll, setShowAll] = useState(false);

  // Core stack: the skills flagged as featured in the backend, then any other
  // Expert/Proficient skill from the engineering categories (not IDEs, PM
  // tools, etc.).
  const core = useMemo(() => {
    const strong = (s: Skill) =>
      s.proficiency === Proficiency.Expert || s.proficiency === Proficiency.Proficient;
    const featured = skills.filter((s) => s.isFeatured).sort(byRankThenName);
    const others = skills
      .filter((s) => !s.isFeatured && strong(s) && coreCategories.has(s.category ?? ""))
      .sort(byRankThenName);
    return [...featured, ...others];
  }, [skills]);

  const groups = useMemo(() => {
    const map = new Map<string, Skill[]>();
    skills.forEach((skill) => {
      const category = skill.category || "Other Tools";
      map.set(category, [...(map.get(category) ?? []), skill]);
    });
    const rank = (c: string) => {
      const i = categoryOrder.indexOf(c);
      return i === -1 ? categoryOrder.length : i;
    };
    return Array.from(map.entries())
      .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
      .map(([title, list]) => ({ title, skills: list.sort(byRankThenName) }));
  }, [skills]);

  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading {...profile.sections.skills} />

      <Reveal className="card p-6 sm:p-8">
        <p className="text-sm font-medium">Core stack</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {core.map((skill) => (
            <li key={skill.slug} className="rounded-xl border border-line bg-surface-2/60 px-4 py-3">
              <p className="flex items-center gap-2 font-medium">
                <span
                  className="h-2 w-2 rounded-full ring-1 ring-fg/10"
                  style={{ backgroundColor: brandColor(skill.visual) }}
                  aria-hidden="true"
                />
                {skill.name}
              </p>
              <p className="mt-0.5 text-xs text-subtle">{skill.proficiency}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="text-sm font-medium text-muted transition-colors hover:text-fg"
            aria-expanded={showAll}
            aria-controls="all-skills"
          >
            {showAll ? "Hide full list" : `Show all ${skills.length} tools by category`}
          </button>

          {showAll && (
            <div id="all-skills" className="route-fade mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="eyebrow mb-3">{group.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <SkillChip key={skill.slug} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
