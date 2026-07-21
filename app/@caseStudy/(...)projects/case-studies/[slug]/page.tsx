import CaseStudy from "@/components/projects/CaseStudy";
import { projects } from "@/data/projects";
import fs from "fs";
import path from "path";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = projects.caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) return;
  const markdown = fs.readFileSync(
    path.join(process.cwd(), `data/case-studies/${slug}.md`),
    "utf-8",
  );
  return <CaseStudy caseStudy={caseStudy} markdown={markdown} />;
}

export default page;
