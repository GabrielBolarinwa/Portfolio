"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import Heading from "./Heading";

export default function ProjectsHeading() {
  const ref = useLoadAnimation();
  return (
    <div
      className="text-center"
      ref={ref}
      data-animation="hoverInTop"
      style={{ "--i": "1.0" } as React.CSSProperties}
    >
      <Heading word="Projects" trigger="load" />
      <p className="mt-4 text-muted">
        A curated collection of engineering challenges — each built to a
        delebrate standard, documented with the decisions and trade-offs that
        shaped them
      </p>
    </div>
  );
}
