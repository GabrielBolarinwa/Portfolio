import { CaseStudy } from "@/types/projects";
import { ArrowRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Card } from "./ui/card";

interface Props {
  project: CaseStudy;
}

export default function CaseStudyCard(props: Props) {
  const { project } = props;
  return (
    <Card
      className={
        "bg-card-background case-study-card relative hover:bg-bg-base/50 overflow-hidden p-6 gap-2 border hover:shadow-md hover:border-accent-neon"
      }
    >
      <div className=" relative w-[75px] h-auto aspect-square border border-accent-neon overflow-hidden flex items-center justify-center rounded-sm case-study-icon">
        <CldImage
          src={project.icon.src}
          alt={project.icon.alt}
          width={project.icon.width}
          height={project.icon.height}
          quality={"auto"}
          format="auto"
          className={"object-cover h-12.5 w-auto object-top"}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 max-lg:h-55 max-sm:mx-auto h-36 justify-center">
        <h3>{project.title}</h3>
        <p className="text-muted text-sm!">{project.shortDescription}</p>
      </div>
      <div className="h-10 mt-4">
        <Link
          href={`/projects/case-studies/${project.slug}`}
          className={
            "w-full border-white/20 border text-white hover:bg-accent-pink hover:border-accent-pink hover:shadow-pink-hover  flex gap-1 justify-center px-6 py-2 rounded-full items-center truncate btn-card"
          }
        >
          View Case Study <ArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
}
