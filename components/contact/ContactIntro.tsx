"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { SiGithub, SiTelegram } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import Link from "next/link";
import Heading from "./Heading";

export default function ContactIntro() {
  const ref = useLoadAnimation();
  return (
    <div className="w-full md:w-[48%]" ref={ref} data-animation="hoverInBottom">
      <Heading trigger="load" word="Get In" gradientWord="Touch" />
      <p className="text-muted">
        Whether you&apos;re looking to collaborate on a project, discuss an
        opportunity or just want to connect — I&apos;m open to the conversation.
        Fill out tthe form and I&apos;ll get back to you within as soon as
        possible.
      </p>
      <div className="flex flex-col w-full gap-6 mt-5">
        <Link
          href={`mailto:gabibola955@gmail.com`}
          className="flex gap-4 text-muted items-center hover:text-text group"
        >
          <span className="text-accent-neon p-2 rounded-lg border border-white/20 group-hover:bg-(image:--primary-gradient) group-hover:text-text">
            <Mail />
          </span>{" "}
          gabibola955@gmail.com
        </Link>
        <Link
          href={`https://github.com/GabrielBolarinwa`}
          className="flex gap-4 text-muted items-center hover:text-text group"
        >
          <span className="text-accent-neon p-2 rounded-lg border border-white/20 group-hover:bg-(image:--primary-gradient) group-hover:text-text">
            <SiGithub />
          </span>{" "}
          github.com/GabrielBolarinwa
        </Link>
        <Link
          href={`mailto:gabibola955@gmail.com`}
          className="flex gap-4 text-muted items-center hover:text-text group"
        >
          <span className="text-accent-neon p-2 rounded-lg border border-white/20 group-hover:bg-(image:--primary-gradient) group-hover:text-text">
            <SiTelegram />
          </span>{" "}
          t.me/gabibola955
        </Link>
      </div>
    </div>
  );
}
