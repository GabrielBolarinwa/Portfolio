"use client";
import {
  fullStackOverview,
  roadmapBlocks,
  transitionNarrative,
} from "@/src/constants/about";
import Heading from "../Heading";
import Word from "./Word";
import {
  Braces,
  Cloud,
  Database,
  Layers,
  MonitorCog,
  Server,
} from "lucide-react";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";

export default function FrontendToFullStack() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12 text-muted">
      <Heading
        word="From Frontend to"
        gradientWord="Full Stack"
        trigger="scroll"
        className="text-main-text"
      />
      <div className="mt-8">
        <p>
          {fullStackOverview.split(" ").map((word, index) => (
            <span key={`${word}-${index}`}>
              <Word index={index} trigger="scroll" word={word} />{" "}
            </span>
          ))}
        </p>
        <p className="mt-4">
          {transitionNarrative.split(" ").map((word, index) => (
            <span key={`${word}-${index}`}>
              <Word index={index} trigger="scroll" word={word} />{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-8 flex gap-4 flex-wrap">
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.1` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            <Braces /> Languages
          </h3>
          <ul className="flex flex-col gap-4">
            {roadmapBlocks.languages.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.2` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            <MonitorCog /> Fundamentals
          </h3>
          <ul>
            {roadmapBlocks.fundamentals.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.3` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            <Server /> Server
          </h3>
          <ul>
            {roadmapBlocks.servers.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.4` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            <Layers /> Frameworks
          </h3>
          <ul>
            {roadmapBlocks.frameworks.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.5` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            <Database /> Databases
          </h3>
          <ul>
            {roadmapBlocks.databases.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.6` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            <Cloud /> DevOps
          </h3>
          <ul>
            {roadmapBlocks.devops.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col bg-card-background p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] border border-white/20 hover:border-accent-neon hover:-translate-y-2 font-(family-name:--font-headings) h-70 gap-4 opacity-50!"
          ref={ref}
          data-animation="hoverInBottom"
          style={{ "--i": `1.7` } as React.CSSProperties}
        >
          <h3 className="text-accent-neon border-accent-neon  flex gap-2 items-center">
            On the Horizon
          </h3>
          <ul>
            {roadmapBlocks.devops.map((block) => (
              <li key={block}>{block}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
