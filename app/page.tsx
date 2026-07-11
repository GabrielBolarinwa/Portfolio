"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useRef, useState } from "react";
import { About } from "../components/About";
import { BubblesBackground } from "../components/BubblesBackground";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroArea } from "../components/HeroArea";
import { Loader } from "../components/Loader";
import { Projects } from "../components/Projects";
import { Services } from "../components/Services";

import { useReadyState } from "@/src/hooks/useReadyState";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontawesome-pro/css/all.min.css";

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const readyState = useReadyState();
  setTimeout(() => {
    readyState && setLoaded(readyState);
  }, 2000);

  const aboutSection = useRef(null);
  const aboutElements = useRef([]);
  const servicesSection = useRef(null);
  const servicesRow1 = useRef(null);
  const servicesRow2 = useRef(null);
  const projectsSection = useRef(null);

  function addAnimationClass(element: HTMLElement) {
    element.style.opacity = "1";
    element.style.visibility = "visible";
    const animationClass = element.getAttribute("data-animation");
    animationClass && element.classList.add(animationClass);
  }

  useEffect(() => {
    const scrollMarginElements = [
      aboutSection,
      servicesSection,

      projectsSection,
    ];
    const animationElements = [];
    const addMargins = () => {
      scrollMarginElements.forEach((scrollMarginElement) => {
        if (scrollMarginElement.current) {
          (scrollMarginElement.current as HTMLElement).style.scrollMargin =
            `var(--header-height)`;
        }
      });
    };
    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addAnimationClass(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0.5 },
    );
    const checkAllLoaded = () => {
      if (document.readyState === "complete") {
        document.fonts.ready.then(() => {
          if (document.fonts.status === "loaded") {
            setLoaded(true);
          }
        });
      }
    };
    if (!loaded) {
      document.addEventListener("readystatechange", checkAllLoaded);
      window.addEventListener("load", () => checkAllLoaded);
    }

    if (window.innerWidth >= 768) {
      animationElements.push(servicesRow1.current, servicesRow2.current);
    }
    aboutElements.current.forEach((aboutElement) => {
      animationElements.push(aboutElement);
    });

    if (animationElements) {
      animationElements.forEach((animationElement) => {
        if (animationElement) {
          (animationElement as never as HTMLElement).style.opacity = "0";
          (animationElement as never as HTMLElement).style.visibility =
            "hidden";
          observer1.observe(animationElement);
        }
      });
    }

    addMargins();

    return () => {
      observer1.disconnect();
      document.removeEventListener("readystatechange", checkAllLoaded);
      window.removeEventListener("loaded", checkAllLoaded);
    };
  }, [loaded]);

  return (
    <>
      <SpeedInsights />
      {!loaded && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      <div className="bubbles-container">
        <BubblesBackground />
      </div>
      <Header addAnimationClass={addAnimationClass} />
      <main id="main" role="main" data-bs-spy="scroll" data-bs-target="#menu">
        <HeroArea />
        <About aboutRef={aboutSection} aboutElements={aboutElements} />
        <Services
          servicesSection={servicesSection}
          servicesRow1={servicesRow1}
          servicesRow2={servicesRow2}
        />
        <Projects projectsRef={projectsSection} />
        <br />
      </main>
      <Footer />
    </>
  );
}

export default App;
