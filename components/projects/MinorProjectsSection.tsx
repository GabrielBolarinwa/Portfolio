"use client";
import { projects } from "@/data/projects";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import MinorProjectCard from "./MinorProjectCard";
import ProjectSectionHeading from "./ProjectSectionHeading";
export default function MinorProjectsSection() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12 w-full">
      <ProjectSectionHeading word="MINOR PROJECTS" bracketWord="MINOR" />
      <ul className="mt-8 w-full flex items-center flex-row flex-wrap  gap-4">
        {projects.minorProjects.map((project, index) => (
          <li
            ref={ref}
            style={{ "--i": `1.${index + 1}` } as React.CSSProperties}
            data-animation="hoverInBottom"
            key={project.title}
            className=" w-5/6  md:w-[48.816%] lg:w-[31.667%] relative hover:-translate-y-1"
          >
            <MinorProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
