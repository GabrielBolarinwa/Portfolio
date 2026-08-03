"use client";
import { projects } from "@/data/projects";
import CaseStudyCard from "../CaseStudyCard";
import ProjectSectionHeading from "./ProjectSectionHeading";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
export default function CaseStudySection() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12 w-full" id="case-studies">
      <ProjectSectionHeading word="CASE STUDIES" bracketWord="CASE-STUDY" />
      <ul className="mt-8 w-full flex max-lg:justify-center items-center flex-row flex-wrap  gap-4">
        {projects.caseStudies.map((project, index) => (
          <li
            ref={ref}
            style={{ "--i": `1.${index + 1}` } as React.CSSProperties}
            data-animation="hoverInBottom"
            key={project.slug}
            className=" w-19/20 md:w-9/20 lg:w-31/100 relative hover:-translate-y-1"
          >
            <CaseStudyCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
