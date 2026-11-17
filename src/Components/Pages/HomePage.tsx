import React from "react";
import ContactCta from "../Home/ContactCta";
import ExperienceTimeline from "../Home/ExperienceTimeline";
import Hero from "../Home/Hero";
import SelectedWork from "../Home/SelectedWork";
import Skills from "../Home/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceTimeline />
      <SelectedWork />
      <Skills />
      <ContactCta />
    </>
  );
}
