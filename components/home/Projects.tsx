"use client";
import { projects as projectsData } from "@/data/projects";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";
import CaseStudyCard from "../CaseStudyCard";
import Heading from "./Heading";

export function Projects() {
  const ref = useScrollAnimationList();
  const projects = projectsData.caseStudies.filter(
    (project) => project.featured,
  );
  return (
    <section className="projects" id="projects">
      <Heading
        description="A selection of my top case-studies"
        headingGradientWord="Work"
        headingWord="Featured"
      />
      <div className="px-4 mt-8 w-full">
        <ul className="w-full flex flex-row flex-wrap gap-4 max-sm:mx-auto">
          {projects.map((project, index) => (
            <li
              key={`project-${index}`}
              className="project w-19/20 md:w-9/20 relative max-sm:mx-auto hover:-translate-y-1"
              data-animation="hoverInBottom"
              style={{ "--i": `1.${index + 3}` } as React.CSSProperties}
              ref={ref}
            >
              <CaseStudyCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
