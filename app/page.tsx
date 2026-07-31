import { HeroArea } from "@/components/home/HeroArea";
import Status from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { Suspense } from "react";
import { Projects } from "@/components/home/Projects";
function App() {
  return (
    <>
      <HeroArea />
      <Suspense>
        <Status />
      </Suspense>
      <Services />

      <Projects />
    </>
  );
}

export default App;
