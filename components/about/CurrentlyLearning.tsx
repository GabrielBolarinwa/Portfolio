"use client";
import React from "react";
import Heading from "@/components/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentlyLearning } from "@/src/constants/about";
import { Badge } from "@/components/ui/badge";
import { progressLength } from "@/lib/utils";
import { Play } from "lucide-react";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { Separator } from "@/components/ui/separator";

function CurrentlyLearning() {
  const ref = useScrollAnimationList();
  const skillBar = useScrollAnimationList(0.1);
  return (
    <div className={"mt-8"}>
      <Heading
        headingWord={"Currently"}
        headingGradientWord={"Learning"}
        trigger={"scroll"}
        animationClass={"slideInRightCustom"}
        heading={3}
      />
      <Accordion className="mt-5 gap-4" multiple>
        {currentlyLearning.map((skill, index) => (
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
                  className={skill?.iconClass || ""}
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
            <AccordionContent
              className={"pl-2 md:pl-8 mt-1 gap-4 flex flex-col"}
            >
              <ul className="gap-4 flex flex-col">
                <h4 className={"uppercase text-muted tracking-wider"}>
                  What I&apos;ve Covered So Far
                </h4>
                {skill.covered.map((item) => (
                  <li className="list-none items-center flex gap-2" key={item}>
                    <Play
                      className="text-accent-neon size-4 w-4 h-4"
                      size={16}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <p>
                <span className="text-accent-pink">Up next:</span>{" "}
                {skill.upcoming}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CurrentlyLearning;
