"use client";
import {
  SiGithub,
  SiTelegram,
  SiTelegramHex,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import { FileDown, Send } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../ui/badge";
import useLoadingState from "@/src/hooks/useLoadingState";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";

function useTypedText(
  texts: string[],
  speed: number,
  pause: number,
  startDelay: number,
) {
  const { progress } = useLoadingState();
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (progress < 100) return;
    const startTimer = setTimeout(
      () => {
        const currentText = texts[index];

        if (!deleting && subIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, subIndex + 1));
          setSubIndex((prev) => prev + 1);
        } else if (deleting && subIndex > 0) {
          setDisplayedText(currentText.substring(0, subIndex - 1));
          setSubIndex((prev) => prev - 1);
        } else if (!deleting && subIndex === currentText.length) {
          setTimeout(() => setDeleting(true), pause);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(startTimer);
  }, [subIndex, deleting, index, texts, speed, pause, startDelay, progress]);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setSubIndex(0);
        setDeleting(false);
        setIndex(0);
      }, startDelay);
      return () => clearTimeout(delayTimer);
    }
  }, [startDelay]);

  return displayedText;
}

export function HeroArea() {
  const texts = [
    "Frontend Engineer",
    "UI/UX Implementer",
    "Javascript Developer",
    "React & Next.js Developer",
  ];

  const avatar = useRef<HTMLDivElement | null>(null);
  const flipInterval = useRef<NodeJS.Timeout | null>(null);
  function startAutoFlip() {
    flipInterval.current = setInterval(() => {
      if (!avatar.current) return;

      avatar.current.classList.toggle("flipped");
    }, 5000);
  }
  const { progress } = useLoadingState();
  const ref = useLoadAnimation();
  useEffect(() => {
    if (progress < 100) return;

    startAutoFlip();
    const handleAvatarClick = () => {
      if (flipInterval.current) clearInterval(flipInterval.current);
      if (avatar.current) {
        avatar.current.classList.toggle("flipped");
        startAutoFlip();
      }
    };
    avatar.current?.addEventListener("click", handleAvatarClick);
    return () => {
      if (flipInterval.current) clearInterval(flipInterval.current);
    };
  }, [progress]);

  const text = useTypedText(texts, 80, 2500, 2800);
  return (
    <section className="hero-area flex justify-center">
      <div className="flex items-center gap-4 p-4 flex-col text-center">
        <div
          className="avatar-container w-[150px] md:w-[225px] h-[150px] md:h-[225px] perspective-midrange rounded-full"
          ref={avatar}
        >
          <div className="transform-3d relative w-full h-full avatar-inner rounded-full border-2 [animation:glow_9.25s_0.75s_ease-in-out_infinite] border-accent-neon bg-card">
            <CldImage
              src="2d2161e1777249eb9235cd8fcc1f5b24_copy_842x842_1_pwqdrg"
              alt="Avatar 1"
              quality={"auto"}
              format="auto"
              className={
                "object-cover h-full w-full aspect-square object-center backface-hidden absolute rounded-full"
              }
              height={842}
              width={842}
            />
            <CldImage
              src="12563_uriilh"
              alt="Avatar 2"
              quality={"auto"}
              format="auto"
              loading="eager"
              className={
                "object-cover h-full w-full aspect-square object-center backface-hidden rotate-y-180 absolute rounded-full"
              }
              height={1139}
              width={1024}
            />
          </div>
        </div>
        <h1
          className="hero-text font-extrabold text-4xl"
          ref={ref}
          data-animation="hoverInBottom"
        >
          Hi, I am Bolarinwa{" "}
          <span className="bg-(image:--primary-gradient) text-transparent bg-clip-text">
            Gabriel
          </span>
        </h1>
        <p
          className="text-muted headings"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": "1" } as React.CSSProperties}
        >
          <span className="typed">
            I build as a <span className="text-accent-pink">{text}</span>
          </span>{" "}
          <span className="typed-cursor" aria-hidden="true">
            |
          </span>
        </p>
        <div className="flex flex-col gap-2 text-muted">
          <p
            ref={ref}
            data-animation="hoverInBottom"
            style={{ "--i": "1.5" } as React.CSSProperties}
          >
            Frontend developer specializing in performant accessible web
            applications — with a production-grade standard applied to every
            project from architecture to deployment.
          </p>
          <p
            ref={ref}
            data-animation="hoverInBottom"
            style={{ "--i": "2" } as React.CSSProperties}
          >
            Currently expanding into full-stack engineering across Python, Java,
            FastAPI, and Spring Boot
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center headings">
          {[
            "React",
            "Next.js",
            "Typescript",
            "Vue",
            "Angular",
            "TailwindCSS",
            "GSAP",
            "Three.js",
          ].map((tag, index) => (
            <Badge
              className="bg-card-background border border-white/20 p-4 text-inherit hover:text-accent-neon hover:border-accent-neon/20 hover:-translate-y-0 translate-y-2 scale-90 relative overflow-hidden headings [transition:border-color_0.3s var(--ease-smooth)] skill-tag"
              key={tag}
              ref={ref}
              data-animation="fadeInCustom"
              style={
                {
                  "--i": `${index * 0.75 + index * 0.2}`,
                } as React.CSSProperties
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div
          className="cta-links mt-4"
          ref={ref}
          data-animation="hoverInBottom"
        >
          <Link
            href="/BolarinwaGabriel_Resume.pdf"
            download
            className="cta bg-(image:--primary-gradient) hover:shadow-cyan-hover border-white/30"
          >
            <FileDown /> Resume
          </Link>
          <Link
            href="/contact"
            className="cta border-white hover:shadow-pink-hover hover:text-accent-pink hover:border-accent-pink"
          >
            <Send /> Contact
          </Link>
        </div>
        <div className="social-icons" ref={ref} data-animation="hoverInBottom">
          <Link
            href="https://github.com/GabrielBolarinwa"
            target="_blank"
            rel="nofollow"
            title="GitHub"
            aria-label="GitHub"
          >
            <SiGithub />
          </Link>
          <Link
            href="https://t.me/gabibola955"
            target="_blank"
            rel="nofollow"
            title="Telegram"
            aria-label="Telegram"
          >
            <SiTelegram color={SiTelegramHex} />
          </Link>

          <a
            href="https://wa.me/09135976371"
            aria-label="Whatsapp"
            title="Whatsapp"
            rel="nofollow"
            target="_blank"
          >
            <SiWhatsapp className={"icon-whatsapp"} />
          </a>
        </div>
      </div>
    </section>
  );
}
