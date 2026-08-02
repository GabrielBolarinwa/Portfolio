import { HeroArea } from "@/components/home/HeroArea";
import Status from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { Suspense } from "react";
import { Projects } from "@/components/home/Projects";
import ContactCard from "@/components/home/ContactCard";
import HomeSections from "@/app/_components/HomeSections";
function App() {
  return (
    <>
      <HomeSections />
      <HeroArea />
      <Suspense>
        <Status />
      </Suspense>
      <Services />
      <Projects />
      <ContactCard />
    </>
  );
}

export default App;
