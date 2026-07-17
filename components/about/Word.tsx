"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";

interface Props {
  word: string;
  trigger: "load" | "scroll";
  index: number;
}

function Word(props: Props) {
  const { word, trigger, index } = props;

  const setRef = useLoadAnimation();
  const setRef2 = useScrollAnimationList();
  return (
    <span
      ref={trigger === "load" ? setRef : setRef2}
      className="duration-1000! inline-block"
      data-animation="slideInRightCustom"
      style={{ "--i": `1.${index + 1}` } as React.CSSProperties}
    >
      {word}
    </span>
  );
}

export default Word;
