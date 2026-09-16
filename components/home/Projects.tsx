"use client";
import { projects as projectsData } from "@/data/projects";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { FolderOpen } from "lucide-react";
import React from "react";
import CaseStudyCard from "../CaseStudyCard";
import LinkTag from "../LinkTag";
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
      <div className="px-4 mt-8 w-full flex justify-center">
        <ul className="grid grid-cols-2 gap-4 max-sm:mx-auto">
          {projects.map((project, index) => (
            <li
              key={`project-${index}`}
              className="project col-span-2 md:col-span-1 relative max-sm:mx-auto hover:-translate-y-1"
              data-animation="hoverInBottom"
              style={{ "--i": `1.${index + 3}` } as React.CSSProperties}
              ref={ref}
            >
              <CaseStudyCard project={project} />
            </li>
          ))}
        </ul>
      </div>
      <LinkTag
        href="/projects"
        className="text-center mx-auto hover:-translate-y-1 font-bold text-sm mt-8"
        variant="secondary"
        trigger="scroll"
        data-animation="hoverInBottom"
      >
        <FolderOpen /> See all projects
      </LinkTag>
    </section>
  );
}
