import React from "react";
import { Link } from "react-router-dom";
import headshot from "../../Assets/images/headshot.jpg";
import { usePortfolioData } from "../../Data/DataProvider";
import { profile } from "../../Data/profile";
import { resumeUrl } from "../../Data/resume";
import { splitSubtitle } from "../../Data/format";
import { ArrowRight, Download, GitHub, LinkedIn, Mail, MapPin } from "../ui/Icons";

export default function Hero() {
  const { experiences } = usePortfolioData();
  const current = experiences[0];
  const { company, details } = splitSubtitle(current?.subtitle);
  const team = details[0];

  return (
    <section className="relative overflow-hidden">
      <div className="hero-backdrop pointer-events-none absolute inset-0 -top-16" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-12 pb-20 pt-12 sm:pt-20 md:grid-cols-[1.35fr_1fr] md:gap-16 md:pb-28 md:pt-24">
        <div className="route-fade">
          {current && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {current.title} at {company}
              {team ? ` · ${team}` : ""}
            </p>
          )}

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.hero.greeting}
          </h1>
          <p className="text-gradient mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {profile.hero.tagline}
          </p>

          <ul className="mt-7 max-w-xl space-y-2.5 text-base leading-relaxed text-muted">
            {profile.hero.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn-primary">
              View projects <ArrowRight size={15} />
            </Link>
            <a href={resumeUrl} download="GabrielCastejonResume.pdf" className="btn-secondary">
              <Download size={15} /> Resume
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                <GitHub />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
                <LinkedIn />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-subtle">
            <span className="eyebrow">Experience at</span>
            {profile.hero.previously.map((org) => (
              <span key={org} className="font-medium text-muted">
                {org}
              </span>
            ))}
          </div>
        </div>

        <div className="route-fade relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-accent/20 blur-3xl" aria-hidden="true" />
          <figure className="card relative overflow-hidden p-2">
            <img
              src={headshot}
              alt={`Portrait of ${profile.name}`}
              className="aspect-square w-full rounded-xl object-cover"
            />
            <figcaption className="flex items-center justify-between px-2 pb-1 pt-3 text-sm">
              <span className="font-medium">{profile.name}</span>
              <span className="inline-flex items-center gap-1 text-subtle">
                <MapPin size={14} /> {profile.location}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
