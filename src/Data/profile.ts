// All of the site's prose lives here — edit this file, not the components.
// Everything below is your original wording from the previous site, moved
// here verbatim. Lines marked TODO are ones you said you want to rewrite or
// that are out of date.
//
// Experiences, projects and skills come from the backend repo's data/*.json.
// The hero's "current role" pill is derived from the first experience there.

export type EducationEntry = {
  degree: string;
  honors?: string;
  school: string;
  detail?: string;
  timeframe: string;
};

export type InvolvementEntry = {
  org: string;
  roles: string;
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  /** Optional sub-heading; omitted when empty. */
  description?: string;
};

export const profile = {
  name: "Gabriel Castejon",
  location: "Orlando, FL",
  email: "gabriel.castejon0802@gmail.com",
  links: {
    github: "https://github.com/gabo0802",
    linkedin: "https://www.linkedin.com/in/gabriel-castejon/",
  },

  hero: {
    greeting: "Hi, I'm Gabe",
    tagline: "Software Engineer @ Electronic Arts",
    // TODO: rewrite. The 4th bullet is out of date (you're on AFL Tools now).
    bullets: [
      "Graduate from the University of Florida 🐊 with a Computer Science Major and Business Administration and Economics Minors",
      "Prev SWE Intern @ Google and Electronic Arts",
      "ColorStack and SHPE Member, HSF Scholar",
      "Currently a Software Engineer at the EA SPORTS Academy program, as a back-end engineer in the College Football Modes team.",
      "Mostly been front-end / full stack developer, but with experience in tons of other tools, see some of what I've worked with below ~",
    ],
    /** Organisations listed under the hero. */
    previously: ["Electronic Arts", "Google", "CodePath", "ColorStack"],
  },

  // TODO: rewrite. Split into several strings to get separate paragraphs.
  about: [
    "I'm currently a Software Engineer at Electronic Arts, where I'm part of the Software Engineering Academy. I began my time at EA on the College Football Modes team and now contribute to the AFL Live team. Previously, I interned with EA's Football SHIELD team after interviewing as an HSF Scholar, and later with Google on the Cloud Storage Encryption team. I graduated from the University of Florida with a bachelor's degree in Computer Science and minors in Business Administration and Economics. At UF, I served as a Tech Fellow for CodePath, was a founding E-Board member of UF's ColorStack chapter, later became Vice President and National Chapter Ambassador, and conducted undergraduate research applying AI to predict microstructure grain growth in materials science. I've remained actively involved with the Hispanic Scholarship Fund, attending the HSF STEM Summit as a Scholar in 2023, Mentor-in-Training in 2024, and Mentor in 2025. Currently, I also serve as an Advisory Council Member in Orlando.",
  ],

  education: [
    {
      degree: "Bachelor's Degree",
      honors: "Magna Cum Laude",
      school: "University of Florida",
      detail: "Computer Science, minors in Business Administration and Economics",
      timeframe: "2021 – 2025",
    },
    {
      degree: "Associate Degree",
      honors: "Highest Honors",
      school: "Broward College",
      timeframe: "2017 – 2021",
    },
    {
      degree: "High School",
      honors: "Valedictorian",
      school: "Charles W. Flanagan",
      timeframe: "2017 – 2021",
    },
  ] as EducationEntry[],

  // Pulled from your About paragraph; reword freely.
  involvement: [
    {
      org: "Hispanic Scholarship Fund",
      roles: "Scholar (2023), Mentor-in-Training (2024), Mentor (2025), Advisory Council Member in Orlando",
    },
    {
      org: "ColorStack",
      roles: "Founding E-Board member at UF, Vice President, National Chapter Ambassador",
    },
    { org: "CodePath", roles: "Tech Fellow" },
    { org: "SHPE", roles: "Member" },
  ] as InvolvementEntry[],

  // Section headings. Titles are your originals; add a description to show a
  // sub-heading under any of them.
  sections: {
    experience: { eyebrow: "Experience", title: "My Journey" } as SectionCopy,
    selectedWork: { eyebrow: "Projects", title: "My Latest Projects" } as SectionCopy,
    skills: {
      eyebrow: "Skills",
      title: "Languages & Tools",
      description: "A snapshot of some of the languages and tools I work with most.",
    } as SectionCopy,
    contact: { eyebrow: "Contact", title: "Feel Free to Contact Me!" } as SectionCopy,
    projectsPage: {
      eyebrow: "Projects",
      title: "My Personal Portfolio",
      description:
        "This is a compilation of some of my favorite projects that I've contributed to. Feel free to take a look at these:",
    } as SectionCopy,
    about: { eyebrow: "About", title: "About Gabe..." } as SectionCopy,
    resume: { eyebrow: "Resume", title: "Resume Preview" } as SectionCopy,
  },
};
