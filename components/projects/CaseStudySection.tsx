"use client";
import { projects } from "@/data/projects";
import CaseStudyCard from "../CaseStudyCard";
import ProjectSectionHeading from "./ProjectSectionHeading";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
export default function CaseStudySection() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12 w-full">
      <ProjectSectionHeading word="CASE STUDIES" bracketWord="CASE-STUDY" />
      <ul className="mt-8 w-full flex items-center flex-row flex-wrap  gap-4">
        {projects.caseStudies.map((project, index) => (
          <li
            ref={ref}
            style={{ "--i": `1.${index + 1}` } as React.CSSProperties}
            data-animation="hoverInBottom"
            key={project.slug}
            className=" w-5/6  md:w-[48.816%] lg:w-[31.667%] relative hover:-translate-y-1"
          >
            <CaseStudyCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
