import React from "react";
import { Proficiency, proficiencyRank, Skill } from "../../Data/types";

// Skill "visual" values are shields.io badge URLs like
// https://img.shields.io/badge/React-20232A?...; pull the brand hex out so the
// chip can show a small colour dot without loading the badge image.
export const brandColor = (visual: string): string | undefined => {
  const match = visual.match(/\/badge\/[^?]*-([0-9a-fA-F]{6})(?:\?|$)/);
  return match ? `#${match[1]}` : undefined;
};

const strongLevels = new Set<Proficiency>([Proficiency.Expert, Proficiency.Proficient]);

type SkillChipProps = {
  skill: Skill;
  showLevel?: boolean;
};

export default function SkillChip({ skill, showLevel = false }: SkillChipProps) {
  const strong = strongLevels.has(skill.proficiency);
  const color = brandColor(skill.visual);

  return (
    <span
      title={`${skill.name} · ${skill.proficiency}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
        strong ? "border-line bg-surface-2 text-fg" : "border-line/70 text-muted"
      }`}
    >
      {color && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full ring-1 ring-fg/10"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}
      {skill.name}
      {showLevel && <span className="text-subtle">· {skill.proficiency}</span>}
    </span>
  );
}

export function SkillChipList({ skills, max }: { skills: Skill[]; max?: number }) {
  // Strongest skills first so the visible chips are the most representative.
  const ordered = [...skills].sort(
    (a, b) => proficiencyRank[b.proficiency] - proficiencyRank[a.proficiency],
  );
  const shown = max ? ordered.slice(0, max) : ordered;
  const hidden = skills.length - shown.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((skill) => (
        <SkillChip key={skill.slug} skill={skill} />
      ))}
      {hidden > 0 && (
        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs text-subtle">
          +{hidden} more
        </span>
      )}
    </div>
  );
}
