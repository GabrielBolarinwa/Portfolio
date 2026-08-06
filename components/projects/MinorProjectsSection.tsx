"use client";
import { projects } from "@/data/projects";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import MinorProjectCard from "./MinorProjectCard";
import ProjectSectionHeading from "./ProjectSectionHeading";
export default function MinorProjectsSection() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12 w-full" id="minor-projects">
      <ProjectSectionHeading word="MINOR PROJECTS" bracketWord="MINOR" />
      <ul className="mt-8 w-full flex items-center max-lg:justify-center flex-row flex-wrap  gap-4">
        {projects.minorProjects.map((project, index) => (
          <li
            ref={ref}
            style={{ "--i": `1.${index + 1}` } as React.CSSProperties}
            data-animation="hoverInBottom"
            key={project.title}
            className="w-19/20 md:w-9/20 lg:w-31/100 relative"
          >
            <MinorProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
