"use client";
import { CaseStudy as CaseStudyType } from "@/types/projects";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowUpRightFromSquare } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import CaseStudyImageSlider from "./CaseStudyImageSlider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  markdown: string;
  caseStudy: CaseStudyType;
}
export default function CaseStudy(props: Props) {
  const { markdown, caseStudy } = props;
  const [open] = useState<boolean>(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [markdown]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) router.back();
      }}
    >
      <DialogContent
        className={
          "w-[90vw]! h-[90dvh]! bg-bg-base border-zinc-800 max-w-none! border"
        }
      >
        <DialogHeader className="text-left p-6 max-sm:px-2 w-full flex flex-row items-center justify-between gap-3 border-b border-b-zinc-800 top-0">
          <div className="flex justify-center h-full">
            <div className="relative w-[75px] h-[75px] aspect-[1] top-1/2 -translate-y-1/2 border border-accent-neon overflow-hidden inline-flex items-center justify-center rounded-lg bg-(image:--primary-gradient) ">
              <CldImage
                src={caseStudy.icon.src}
                alt={caseStudy.icon.alt}
                width={caseStudy.icon.width}
                height={caseStudy.icon.height}
                quality={"auto"}
                format="auto"
                className={"object-cover h-12.5 w-auto object-top"}
              />
            </div>
          </div>
          <div>
            <DialogTitle className="text-base">{caseStudy.title}</DialogTitle>
            <p className="text-sm text-muted max-h-16 truncate whitespace-normal">
              {caseStudy.shortDescription}
            </p>
          </div>
        </DialogHeader>
        <div
          className="flex-1 overflow-y-auto px-6 prose-sm w-full mt-2 case-study-writeup"
          ref={containerRef}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          <CaseStudyImageSlider images={caseStudy.screenshots} />
        </div>
        <DialogFooter className="flex justify-end gap-4 w-full p-6 border-t border-zinc-800 items-center bg-bg-base flex-row">
          <Link
            href={caseStudy.repoUrl}
            target="_blank"
            className="flex gap-4 border-zinc-800 border-2 rounded-full bg-white/5 hover:-translate-y-0.5 hover:text-accent-pink hover:scale-105 hover:shadow-pink-hover px-6 py-3 items-center justify-center"
          >
            <SiGithub /> View on GitHub
          </Link>
          <Link
            href={caseStudy.liveUrl}
            target="_blank"
            className="flex gap-4 border-zinc-800 border-2 rounded-full bg-white/20 hover:-translate-y-0.5  hover:scale-105 hover:shadow-neon-hover bg-(image:--primary-gradient) px-6 py-3 items-center justify-center"
          >
            <ArrowUpRightFromSquare /> Open Project
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
