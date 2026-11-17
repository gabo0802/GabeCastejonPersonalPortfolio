import React from "react";
import headshot from "../../Assets/images/headshot.jpg";
import { profile } from "../../Data/profile";
import { resumeUrl } from "../../Data/resume";
import { ArrowUpRight, Download } from "../ui/Icons";
import Reveal from "../ui/Reveal";

export default function AboutPage() {
  return (
    <div className="container-page pb-24 pt-12 sm:pt-20">
      {/* Intro */}
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="route-fade">
          <p className="eyebrow">{profile.sections.about.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.sections.about.title}
          </h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="route-fade relative lg:pt-10">
          <div className="absolute -inset-4 rounded-[2rem] bg-accent/15 blur-3xl" aria-hidden="true" />
          <figure className="card relative overflow-hidden p-2">
            <img src={headshot} alt={`Portrait of ${profile.name}`} className="aspect-square w-full rounded-xl object-cover" />
          </figure>
        </div>
      </div>

      {/* Education + involvement */}
      <div className="mt-24 grid gap-12 md:grid-cols-2">
        <Reveal as="section">
          <p className="eyebrow">Education</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {profile.education.map((entry) => (
              <li key={entry.school} className="flex flex-col gap-1 py-5 sm:flex-row sm:justify-between sm:gap-6">
                <div>
                  <p className="font-medium">
                    {entry.degree}
                    {entry.honors && <span className="text-subtle"> · {entry.honors}</span>}
                  </p>
                  <p className="text-sm text-muted">{entry.school}</p>
                  {entry.detail && <p className="mt-1 text-sm text-subtle">{entry.detail}</p>}
                </div>
                <p className="shrink-0 font-mono text-xs leading-6 text-subtle">{entry.timeframe}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section">
          <p className="eyebrow">Community</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {profile.involvement.map((entry) => (
              <li key={entry.org} className="py-5">
                <p className="font-medium">{entry.org}</p>
                <p className="text-sm text-muted">{entry.roles}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Resume */}
      <Reveal as="section" className="mt-24">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{profile.sections.resume.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{profile.sections.resume.title}</h2>
          </div>
          <div className="flex gap-3">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              Open <ArrowUpRight size={15} />
            </a>
            <a href={resumeUrl} download="GabrielCastejonResume.pdf" className="btn-primary">
              <Download size={15} /> Download My Resume
            </a>
          </div>
        </div>
        <div className="card hidden overflow-hidden p-2 md:block">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
            title={`${profile.name} resume`}
            className="aspect-[8.5/11] w-full rounded-xl bg-white"
          />
        </div>
      </Reveal>
    </div>
  );
}
