import { loadPortfolioData, portfolioSnapshot } from "./api";

// These checks guard the backend snapshot itself, so a half-applied content
// update (a role whose skills never got added, a typo in a slug) fails the
// build instead of silently disappearing from the site.

const { skills, projects, experiences, project_skills, experience_skills } =
  portfolioSnapshot;

const skillSlugs = new Set(skills.map((s) => s.slug));
const projectSlugs = new Set(projects.map((p) => p.slug));
const experienceSlugs = new Set(experiences.map((e) => e.slug));

const duplicates = (values: string[]) =>
  values.filter((value, index) => values.indexOf(value) !== index);

test("slugs are unique", () => {
  expect(duplicates(skills.map((s) => s.slug))).toEqual([]);
  expect(duplicates(projects.map((p) => p.slug))).toEqual([]);
  expect(duplicates(experiences.map((e) => e.slug))).toEqual([]);
});

test("every project skill link points at a real project and skill", () => {
  const broken = project_skills.filter(
    (r) => !projectSlugs.has(r.project_slug) || !skillSlugs.has(r.skill_slug),
  );
  expect(broken).toEqual([]);
});

test("every experience skill link points at a real experience and skill", () => {
  const broken = experience_skills.filter(
    (r) => !experienceSlugs.has(r.experience_slug) || !skillSlugs.has(r.skill_slug),
  );
  expect(broken).toEqual([]);
});

test("experience order_index values are unique", () => {
  expect(duplicates(experiences.map((e) => String(e.order_index)))).toEqual([]);
});

test("the snapshot normalizes into the site's data contract", () => {
  const data = loadPortfolioData();

  expect(data.skills.length).toBeGreaterThan(0);
  expect(data.projects.length).toBeGreaterThan(0);
  expect(data.experiences.length).toBeGreaterThan(0);

  const orderIndexes = [...experiences]
    .sort((a, b) => a.order_index - b.order_index)
    .map((e) => e.slug);
  expect(data.experiences.map((e) => e.slug)).toEqual(orderIndexes);

  data.experiences.forEach((experience) => {
    expect(experience.tech?.length ?? 0).toBeGreaterThan(0);
  });
});
