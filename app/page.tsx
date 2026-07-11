"use client";
import { Header } from "../components/Header";
import { HeroArea } from "../components/HeroArea";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Portfolio } from "../components/Portfolio";
import { Projects } from "../components/Projects";
import { Footer } from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { BubblesBackground } from "../components/BubblesBackground";
import { Loader } from "../components/Loader";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./assets/fontawesome-pro/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useReadyState } from "@/app/hooks/useReadyState";

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
  const portfolioSection = useRef(null);
  const portfolioElements = useRef([]);
  const projectsSection = useRef(null);

  function addAnimationClass(element: HTMLElement) {
    element.style.opacity = "1";
    element.style.visibility = "visible";
    const animationClass = element.getAttribute("data-animation");
    animationClass && element.classList.add(animationClass);
  }

  const headerElem = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const scrollMarginElements = [
      aboutSection,
      servicesSection,
      portfolioSection,
      projectsSection,
    ];
    const animationElements = [];
    const addMargins = () => {
      scrollMarginElements.forEach((scrollMarginElement) => {
        if (scrollMarginElement.current) {
          (scrollMarginElement.current as HTMLElement).style.scrollMargin =
            `${(headerElem.current as never as HTMLElement)?.offsetHeight}px`;
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
    portfolioElements.current.forEach((portfolioElement) => {
      animationElements.push(portfolioElement);
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
      <Header headerElem={headerElem} addAnimationClass={addAnimationClass} />
      <main id="main" role="main" data-bs-spy="scroll" data-bs-target="#menu">
        <HeroArea />
        <About aboutRef={aboutSection} aboutElements={aboutElements} />
        <Services
          servicesSection={servicesSection}
          servicesRow1={servicesRow1}
          servicesRow2={servicesRow2}
        />
        <Portfolio
          portfolioRef={portfolioSection}
          portfolioElements={portfolioElements}
        />
        <Projects projectsRef={projectsSection} />
        <br />
      </main>
      <Footer />
    </>
  );
}

export default App;
