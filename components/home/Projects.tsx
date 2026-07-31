"use client";
import { projects as projectsData } from "@/data/projects";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";
import CaseStudyCard from "../CaseStudyCard";
import Heading from "./Heading";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

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
      <Link
        href="/projects"
        className="flex gap-3 py-3 px-6 rounded-full border border-white hover:border-accent-pink hover:shadow-pink-hover hover:text-accent-pink w-fit items-center justify-center mt-8 text-center mx-auto hover:-translate-y-1 font-bold text-sm"
        ref={ref}
        data-animation="hoverInBottom"
      >
        <FolderOpen /> See all projects
      </Link>
    </section>
  );
}
