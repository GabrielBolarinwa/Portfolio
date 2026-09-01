import React from "react";
import Heading from "../Heading";
import FrontendSkills from "@/components/about/FrontendSkills";
import CreativeTools from "@/components/about/CreativeTools";
import CurrentlyLearning from "@/components/about/CurrentlyLearning";

export default function Skills() {
  return (
    <section className="mt-12" id="skills">
      <Heading
        headingWord="Core"
        headingGradientWord="Skills"
        className="text-main-text gradient-underline"
        animationClass="slideInLeftCustom"
        trigger="scroll"
      />
      <FrontendSkills />
      <CreativeTools />
      <CurrentlyLearning />
    </section>
  );
}
