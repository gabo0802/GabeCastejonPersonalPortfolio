import React, { createContext, useContext } from "react";
import { Experience, Project, Skill } from "./types";
import { loadPortfolioData } from "./api";

export type PortfolioData = {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  skillsBySlug: Record<string, Skill>;
  featuredSkills: Skill[];
};

function buildPortfolioData(): PortfolioData {
  const { projects, experiences, skills } = loadPortfolioData();
  return {
    projects,
    experiences,
    skills,
    skillsBySlug: Object.fromEntries(skills.map((s) => [s.slug, s])),
    featuredSkills: skills.filter((s) => s.isFeatured),
  };
}

// Data is bundled with the app, so it is built once at module load.
const portfolioData = buildPortfolioData();

const DataContext = createContext<PortfolioData>(portfolioData);

export const usePortfolioData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DataContext.Provider value={portfolioData}>{children}</DataContext.Provider>
);
