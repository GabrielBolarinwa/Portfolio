"use client";
import { About } from "@/components/About";
import { HeroArea } from "@/components/HeroArea";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useRef } from "react";

function App() {
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
    };
  }, []);

  return (
    <>
      <SpeedInsights />

      <main id="main" role="main">
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
    </>
  );
}

export default App;
