import { HeroArea } from "@/components/home/HeroArea";
import Status from "@/components/home/Stats";
import { Suspense } from "react";
function App() {
  return (
    <>
      <main id="main" role="main">
        <HeroArea />
        <Suspense>
          <Status />
        </Suspense>
        {/* <Services
          servicesSection={servicesSection}
          servicesRow1={servicesRow1}
          servicesRow2={servicesRow2}
        />
        <Projects projectsRef={projectsSection} /> */}
      </main>
    </>
  );
}

export default App;
