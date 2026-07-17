"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";

interface Props {
  word: string;
  gradientWord: string;
  trigger: "load" | "scroll";
}

function Heading(props: Props) {
  const { word, trigger, gradientWord } = props;

  const setRef = useLoadAnimation();
  const setRef2 = useScrollAnimationList();
  return (
    <h2
      className="inline-block"
      ref={trigger === "load" ? setRef : setRef2}
      data-animation="slideInLeftCustom"
    >
      {word}{" "}
      {gradientWord && (
        <span
          className="bg-(image:--primary-gradient) text-transparent bg-clip-text inline-block"
          ref={trigger === "load" ? setRef : setRef2}
          style={{ "--i": "1.5" } as React.CSSProperties}
          data-animation="slideInRightCustom"
        >
          {gradientWord}
        </span>
      )}
    </h2>
  );
}

export default Heading;
