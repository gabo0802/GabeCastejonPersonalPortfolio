import experiences from "../generated/backend/experiences.json";
import experienceSkills from "../generated/backend/experience_skills.json";
import projects from "../generated/backend/projects.json";
import projectSkills from "../generated/backend/project_skills.json";
import skills from "../generated/backend/skills.json";
import {
  normalizePortfolioData,
  PortfolioDataPayload,
  RawExperience,
  RawExperienceSkill,
  RawPortfolioSnapshot,
  RawProject,
  RawProjectSkill,
  RawSkill,
} from "./portfolioData";

/**
 * The JSON files in the PersonalPortfolioBackend submodule are the single
 * source of truth. They are copied into src/generated/backend by
 * scripts/prepare-backend-assets.js before every start, build and test, and
 * bundled with the app, so the site renders instantly with no network call.
 */
export const portfolioSnapshot: RawPortfolioSnapshot = {
  skills: skills as RawSkill[],
  projects: projects as RawProject[],
  experiences: experiences as RawExperience[],
  project_skills: projectSkills as RawProjectSkill[],
  experience_skills: experienceSkills as RawExperienceSkill[],
};

export function loadPortfolioData(): PortfolioDataPayload {
  return normalizePortfolioData(portfolioSnapshot);
}
