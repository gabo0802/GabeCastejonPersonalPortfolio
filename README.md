# Gabriel Castejon — Personal Portfolio

A React + TypeScript portfolio site showcasing experience, projects, skills, and resume.

## Stack

- React 18 + TypeScript (Create React App)
- React Router (`HashRouter`, for GitHub Pages)
- Tailwind CSS with CSS-variable design tokens (dark by default, light follows the system setting)
- Geist / Geist Mono from Google Fonts

## Project Structure

```text
backend/                  # PersonalPortfolioBackend Git submodule (data + resume)
src/
	Components/
		Layout/               # Header, Footer
		Home/                 # Hero, ExperienceTimeline, SelectedWork, Skills, ContactCta
		Pages/                # HomePage, ProjectsPage, ProjectDetailPage, AboutPage
		ui/                   # Icons, Reveal, SectionHeading, SkillChip
		ProjectCard.tsx
	Data/
		api.ts                # loads the bundled backend snapshot
		portfolioData.ts      # normalizes raw table-shaped JSON
		portfolioData.test.ts # integrity checks for the snapshot
		profile.ts            # site copy: hero, bio, education, community, links
		types.ts
	generated/              # populated from the backend submodule before start/build/test
	index.css               # Tailwind layers + design tokens
```

## Getting Started

```bash
git submodule update --init --recursive
npm install
npm start
```

`npm test` runs integrity checks on the backend snapshot (unique slugs,
every skill link resolves). The deploy workflow runs them before building.

## Content Management

The JSON files in the `PersonalPortfolioBackend` submodule are the single
source of truth. There is no runtime database call: the data is bundled, so
the site renders immediately.

- **Experiences, projects, skills** live in `backend/data/*.json`
  (`experiences.json` is ordered by `order_index`; the first entry is shown as
  the current role in the hero). Skill links live in `experience_skills.json`
  and `project_skills.json`.
- **Everything else** (hero headline, bio, education, community, contact
  links) lives in `src/Data/profile.ts`.
- **Resume** is `backend/GabrielCastejonSWE.pdf`, built from the `.tex` source.

`scripts/prepare-backend-assets.js` copies the snapshot and resume into
`src/generated/backend` before start, build and test. The Pages workflow
fetches the backend's latest `main` on every run, and the backend redeploys
this site whenever `data/**` or the resume changes (its `notify-frontend.yml`
and `build-resume.yml` workflows). After each successful deploy, the
`bump-backend-pointer` job commits the deployed backend commit as this repo's
submodule pointer, so `main` always matches what is live.

Locally, `npm run backend:latest` moves `backend/` to the backend's newest
`main`. Running `git config submodule.recurse true` once makes `git pull` keep
`backend/` in sync with the pointer automatically.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
