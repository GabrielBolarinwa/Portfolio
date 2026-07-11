"use client";
import { RefObject, useRef } from "react";
import { projects } from "@/src/constants/index";
import Image from "next/image";
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
      <div className="container-fluid w-100">
        <ul className="row mt-0">
          {projects.map((project, index) => (
            <li
              key={`project-${index}`}
              className="project col-12 col-sm-8 col-md-6 col-lg-4"
              ref={setProjects}
            >
              <figure className="card mb-3">
                <div className="project-preview-image">
                  <Image
                    decoding="async"
                    loading="lazy"
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    width={"325"}
                    height={"320"}
                  />
                </div>
                <figcaption className="card-body">
                  <div className="project-description">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <button className="btn btn-info project-btn">
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Open Project <span className="fa fa-arrow-right"></span>
                    </a>
                  </button>
                  <div className="tags">
                    {project.techTags.map((tag, index) => (
                      <span key={index} className="tag vue">
                        {tag}
                      </span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
