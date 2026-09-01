"use client";
import React from "react";
import Heading from "@/components/Heading";
import { creativeTools } from "@/src/constants/about";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { progressLength } from "@/lib/utils";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";

function CreativeTools() {
  const skillBar = useScrollAnimationList(0.1);

  return (
    <div className={"mt-5"}>
      <Heading
        headingWord={"Creative"}
        headingGradientWord={"Tools"}
        trigger={"scroll"}
        animationClass={"slideInRightCustom"}
        heading={3}
      />
      <p className="text-muted">
        Supporting skills I lean on for design, video, and audio work — not core
        to my stack, but they round out how I ship ideas end to end.
      </p>
      <ul className={"mt-5 flex flex-wrap gap-4"}>
        {creativeTools.map((creativeTool, index) => (
          <li
            key={creativeTool.skill}
            className={
              "flex justify-center flex-col rounded-md h-auto w-12/13 md:w-9/20 lg:w-31/100 hover:-translate-y-1"
            }
          >
            <Card
              className={
                "bg-card-background border border-white/20 p-6 shadow-card-hover cursor-default hover:border-accent-pink w-full group"
              }
            >
              <CardHeader className={"flex gap-3 px-0"}>
                <creativeTool.icon
                  className={"text-accent-neon group-hover:text-accent-pink"}
                />
                {creativeTool.skill}
              </CardHeader>
              <div className="flex justify-between">
                <div className="bg-card-background h-2.5 px-8 w-60 rounded-lg max-sm:hidden relative overflow-hidden">
                  <div
                    className="bg-(image:--primary-gradient) absolute top-0 left-0 h-full w-(--width) scale-x-1 origin-left rounded-lg"
                    ref={skillBar}
                    style={
                      {
                        "--width": `${progressLength(creativeTool.skillLevel)}%`,
                        "--i": `0.${index + 1}`,
                      } as React.CSSProperties
                    }
                    data-animation="fillWidth"
                  ></div>
                </div>
                <p>{creativeTool.skillLevel}</p>
              </div>

              <CardDescription>{creativeTool.skillDetail}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreativeTools;
