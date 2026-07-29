import ProjectsHeading from "@/components/projects/ProjectsHeading";
import { Metadata } from "next";
import CaseStudySection from "../../components/projects/CaseStudySection";
import MinorProjectsSection from "../../components/projects/MinorProjectsSection";

export const metadata: Metadata = {
  title: "Projects | Bolarinwa Gabriel Portfolio",
};
export default function Projects() {
  return (
    <>
      <ProjectsHeading />
      <CaseStudySection />
      <MinorProjectsSection />
    </>
  );
}
