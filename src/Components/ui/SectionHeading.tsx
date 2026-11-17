import React from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-muted">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}
