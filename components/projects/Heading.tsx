"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";

interface Props {
  word: string;
  trigger: "load" | "scroll";
  className?: string;
}

function Heading(props: Props) {
  const { trigger, word, className } = props;

  const setRef = useLoadAnimation();
  const setRef2 = useScrollAnimationList();
  return (
    <h2
      className={`${className || ""} section-title text-transparent bg-(image:--primary-gradient) bg-clip-text`}
      ref={trigger === "load" ? setRef : setRef2}
      style={{ "--i": "1.5" } as React.CSSProperties}
      data-animation="hoverInTop"
    >
      {word}
    </h2>
  );
}

export default Heading;
