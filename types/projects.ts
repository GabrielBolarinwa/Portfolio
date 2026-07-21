import { IconType } from "@icons-pack/react-simple-icons";
import { LucideIcon } from "lucide-react";
export interface CaseStudy {
  slug: string;
  title: string;
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  shortDescription: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  screenshots: Screenshot[];
}

interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Projects = {
  caseStudies: CaseStudy[];
  minorProjects: MinorProject[];
};

export interface MinorProject {
  title: string;
  previewImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  shortDescription: string;
  tags: {
    name: string;
    icon: LucideIcon | IconType;
    color: string;
    class: string;
  }[];
  liveUrl: string;
  repoUrl: string;
}
