import ProjectsHeading from "@/components/projects/ProjectsHeading";
import { Metadata } from "next";
import CaseStudySection from "../../components/projects/CaseStudySection";
import MinorProjectsSection from "../../components/projects/MinorProjectsSection";
import ProjectsSections from "./_components/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects | Bolarinwa Gabriel Portfolio",
};
export default function Projects() {
  return (
    <>
      <ProjectsSections />
      <ProjectsHeading />
      <CaseStudySection />
      <MinorProjectsSection />
    </>
  );
}
