import CaseStudy from "@/components/projects/CaseStudy";
import { projects } from "@/data/projects";
import fs from "fs";
import path from "path";

type Slug = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Slug) {
  const { slug } = await params;
  const caseStudy = projects.caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) {
    return { title: "Case Study | Bolarinwa Gabriel Portfolio" };
  }
  return {
    title: `${caseStudy.title} Case Study | Bolarinwa Gabriel Portfolio`,
  };
}

async function page({ params }: Slug) {
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
