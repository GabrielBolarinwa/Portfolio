import ProjectsHeading from "@/components/projects/ProjectsHeading";
import { Metadata } from "next";
import CaseStudySection from "../../components/projects/CaseStudySection";

export const metadata: Metadata = {
  title: "Projects | Bolarinwa Gabriel",
};
export default function Projects() {
  return (
    <>
      <ProjectsHeading />
      <CaseStudySection />
    </>
  );
}
