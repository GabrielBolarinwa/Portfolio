"use client";
import { HeroArea } from "@/components/home/HeroArea";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { useRef } from "react";
function App() {
  const servicesSection = useRef(null);
  const servicesRow1 = useRef(null);
  const servicesRow2 = useRef(null);
  const projectsSection = useRef(null);

  return (
    <>
      <main id="main" role="main">
        <HeroArea />
        <Services
          servicesSection={servicesSection}
          servicesRow1={servicesRow1}
          servicesRow2={servicesRow2}
        />
        <Projects projectsRef={projectsSection} />
      </main>
    </>
  );
}

export default App;
