"use client";
import { skills } from "@/src/constants/about";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";
import Heading from "../Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Play } from "lucide-react";

export default function Skills() {
  const ref = useScrollAnimationList();
  const skillBar = useScrollAnimationList(0.1);
  function progressLength(skillLevel: string) {
    if (skillLevel === "Expert") {
      return 100;
    } else if (skillLevel === "Advanced") {
      return 75;
    } else if (skillLevel === "Intermediate") {
      return 50;
    } else if (skillLevel === "Beginner") {
      return 25;
    }
  }

  return (
    <section className="mt-12">
      <Heading word="Core" gradientWord="Skills" trigger="scroll" />
      <Accordion className="mt-5 gap-4" multiple>
        {skills.map((skill, index) => (
          <AccordionItem
            value={skill.skill}
            key={skill.skill}
            ref={ref}
            className={"justify-center"}
            data-animation="hoverInBottom"
            style={{ "--i": `0.${index}` } as React.CSSProperties}
          >
            <AccordionTrigger className={"gap-4 skill-accordion-trigger group"}>
              <div className="flex max-sm:w-full gap-4">
                <skill.icon
                  color={skill.iconColor}
                  className={skill.iconClass}
                />
                <span className="group-hover:text-accent-neon decoration-accent-neon!">
                  {skill.skill}
                </span>
                <Badge className="max-sm:ml-auto ml-8">
                  {skill.skillLevel}
                </Badge>
              </div>
              <div className="bg-card-background h-2.5 px-8 w-60 ml-auto rounded-lg max-sm:hidden relative overflow-hidden">
                <div
                  className="bg-(image:--primary-gradient) absolute top-0 left-0 h-full w-(--width) scale-x-1 origin-left rounded-lg"
                  ref={skillBar}
                  style={
                    {
                      "--width": `${progressLength(skill.skillLevel)}%`,
                      "--i": `0.${index + 1}`,
                    } as React.CSSProperties
                  }
                  data-animation="fillWidth"
                ></div>
              </div>
            </AccordionTrigger>
            <AccordionContent className={"pl-8 gap-4 flex flex-col mt-1"}>
              {skill.skillDetails.map((detail) => (
                <li className="list-none items-center  flex gap-2" key={detail}>
                  <Play className="text-accent-neon" size={16} />
                  {detail}
                </li>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
