"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { projects } from "@/src/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useRef } from "react";

interface Props {
  projectsRef: RefObject<HTMLElement | null>;
}
export function Projects({ projectsRef }: Props) {
  const setProjects = (el: HTMLElement | null) => {
    if (el && !projectsItems.current?.includes(el)) {
      projectsItems.current?.push(el);
    }
  };
  const projectsItems = useRef<HTMLElement[] | null>([]);
  return (
    <section
      ref={projectsRef}
      className="projects text-center"
      id="projects"
      data-animation="bounceInRight"
    >
      <div>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="px-4 w-full">
        <ul className="my-(--size-value-normal) w-full flex justify-center items-center flex-row flex-wrap mt-0 gap-4">
          {projects.map((project, index) => (
            <li
              key={`project-${index}`}
              className="project w-5/6 sm:w-4/5 md:w-9/20 lg:w-3/10 relative hover:-translate-y-1"
              ref={setProjects}
            >
              <Card
                className={
                  "bg-project overflow-hidden p-0 gap-2 hover:shadow-(--project-card-shadow)"
                }
              >
                <div className="p-6 relative h-[250px] overflow-hidden">
                  <Image
                    src={project.imageSrc}
                    alt={project.name}
                    fill
                    className={"object-cover object-top"}
                  />
                </div>
                <div className="flex flex-col gap-2 px-4 h-36 justify-center">
                  <h3 className="underline underline-offset-4 text-xl!">
                    {project.name}
                  </h3>
                  <p className="text-white/70 text-sm!">
                    {project.description}
                  </p>
                </div>
                <div className="h-5 px-6">
                  <Link
                    href={project.projectLink}
                    className={
                      "w-full border-white/20 text-white hover:bg-theme! hover:drop-shadow-(--project-btn-drop-shadow) flex gap-1 bg-bg justify-center px-6 py-2 rounded-lg items-center"
                    }
                  >
                    Open Project <ArrowRight size={16} />
                  </Link>
                </div>
                <CardFooter className={"mt-4 py-2"}>
                  <div className="flex flex-wrap gap-2 justify-center items-center h-15 w-full">
                    {project.techTags.map((tag) => (
                      <Badge
                        key={tag}
                        className={
                          "text-xs text-white/80 border border-white/20 rounded-full px-4 py-3 bg-bg"
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
