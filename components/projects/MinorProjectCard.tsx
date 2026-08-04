import { MinorProject } from "@/types/projects";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowUpRightFromSquare } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardFooter } from "../ui/card";

interface Props {
  project: MinorProject;
}

export default function MinorProjectCard(props: Props) {
  const { project } = props;
  return (
    <Card
      className={
        "bg-card-background overflow-hidden p-0 gap-2 hover:shadow-(--project-card-shadow) text-center minor-project-card hover:bg-bg-base"
      }
    >
      <div className="relative h-[250px]">
        <CldImage
          src={project.previewImage.src}
          alt={project.previewImage.alt}
          height={project.previewImage.height}
          width={project.previewImage.width}
          className={"object-cover object-top h-full w-full"}
        />
      </div>
      <div className="flex flex-col gap-2 px-4 h-36 justify-center">
        <h3 className="underline underline-offset-4 ">{project.title}</h3>
        <p className="text-white/70 text-sm!">{project.shortDescription}</p>
      </div>
      <div className="h-[88px] px-6 flex flex-col gap-4">
        <Link
          href={project.liveUrl}
          className={
            "w-full border-white/20 border text-white hover:bg-accent-pink hover:border-accent-pink hover:shadow-pink-hover flex gap-2 justify-center px-6 py-2 rounded-full items-center btn-card"
          }
        >
          Open Project <ArrowUpRightFromSquare size={16} />
        </Link>
        <Link
          href={project.repoUrl}
          className={
            "w-full border-white/20 border text-white hover:bg-[#333333] hover:scale-x-105 hover:shadow-md flex gap-2 justify-center px-6 py-2 rounded-full items-center btn-card"
          }
        >
          <SiGithub size={16} /> GitHub
        </Link>
      </div>
      <CardFooter className={"mt-4 py-2"}>
        <div className="flex flex-wrap gap-2 justify-center items-center h-15 w-full">
          {project.tags.map((tag) => (
            <Badge
              key={tag.name}
              className={
                "text-xs text-white/80 border border-white/20 rounded-full px-4 py-3 bg-bg"
              }
            >
              <tag.icon className={tag.class} color={tag.color} /> {tag.name}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
