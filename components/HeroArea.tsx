"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import Image from "next/image";

function useTypedText(
  texts: string[],
  speed: number,
  pause: number,
  startDelay: number,
) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
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
  }, [subIndex, deleting, index, texts, speed, pause, startDelay]);

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
    "Frontend Web Developer",
    "Javascript Developer",
    "UI/UX Designer",
  ];
  const { width } = useWindowSize();

  const text = useTypedText(texts, 80, 2500, 2800);
  return (
    <section className="hero-area d-flex justify-content-center">
      <div className="d-flex flex-column gap-3 align-items-center justify-content-center text-center">
        <Image
          src="/images/hero-img.webp"
          alt="Bolarinwa Gabriel Logo"
          className="hero-img"
          fetchPriority="high"
          width={width >= 768 ? 200 : "150"}
          height={width >= 768 ? "200" : "150"}
          loading="eager"
        />
        <h1 className="hero-text display-5 fw-bolder">
          Hi, I am Bolarinwa Gabriel
        </h1>
        <p className="text-info fw-bolder fs-5">
          <span className="typed">A {text}</span>{" "}
          <span className="typed-cursor" aria-hidden="true">
            |
          </span>
        </p>
        <div className="cta-links">
          <a href="#portfolio" className="cta cta-portfolio">
            Portfolio{" "}
          </a>
          <a href="#about" className="cta cta-about">
            About
          </a>
        </div>
        <div className="social-icons">
          <a
            href="https://web.facebook.com/itzamazz.amazz"
            target="_blank"
            rel="nofollow"
            aria-label="Facebook"
            title="Facebook"
          >
            <span className="fa-brands fa-facebook"></span>
          </a>
          <a
            href="https://x.com/GabrielBol94988"
            target="_blank"
            rel="nofollow"
            aria-label="Twitter (X)"
            title="Twitter (X)"
          >
            <span className="bi bi-twitter-x"></span>
          </a>
          <a
            href="https://github.com/GabrielBolarinwa/GabrielBolarinwa"
            target="_blank"
            rel="nofollow"
            title="GitHub"
            aria-label="GitHub"
          >
            <span className="fa-brands fa-github" title="Github"></span>
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-bolarinwa-028418399"
            target="_blank"
            rel="nofollow"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <span className="bi bi-linkedin" title="LinkedIn"></span>
          </a>

          <a
            href="https://wa.me/09135976371"
            aria-label="Whatsapp"
            title="Whatsapp"
            rel="nofollow"
            target="_blank"
          >
            <span className="fa-brands fa-whatsapp"></span>
          </a>
          <a
            href="mailto:gabibola955@gmail.com"
            rel="nofollow"
            title="Gmail"
            aria-label="Gmail"
            target="_blank"
          >
            <span className="fa-brands fa-solid fa-envelope"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
