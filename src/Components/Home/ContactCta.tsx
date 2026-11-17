import React from "react";
import { profile } from "../../Data/profile";
import { GitHub, LinkedIn, Mail } from "../ui/Icons";
import Reveal from "../ui/Reveal";

export default function ContactCta() {
  const contact = profile.sections.contact;
  return (
    <section className="container-page pb-20 md:pb-28">
      <Reveal className="card relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40rem 18rem at 50% 120%, rgb(var(--accent) / 0.18), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {contact.title}
          </h2>
          {contact.description && <p className="mx-auto mt-4 max-w-md text-muted">{contact.description}</p>}
          <p className="mt-3 select-all font-mono text-sm text-subtle">{profile.email}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail size={15} /> Email me
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              <LinkedIn size={15} /> LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
              <GitHub size={15} /> GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
