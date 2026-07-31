import { HeroArea } from "@/components/home/HeroArea";
import Status from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { Suspense } from "react";
function App() {
  return (
    <>
      <HeroArea />
      <Suspense>
        <Status />
      </Suspense>
      <Services />
      {/* 
        <Projects projectsRef={projectsSection} /> */}
    </>
  );
}

export default App;
