import React from "react";
import { profile } from "../../Data/profile";
import { GitHub, LinkedIn, Mail } from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <div className="flex items-center gap-2">
          <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email">
            <Mail />
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
            <GitHub />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
            <LinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
