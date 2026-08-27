"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import BaseHeading from "../Heading";

interface Props {
  headingWord: string;
  headingGradientWord: string;
  description: string;
}

function Heading(props: Props) {
  const { headingWord, headingGradientWord, description } = props;
  const ref = useScrollAnimationList();
  return (
    <div
      className="flex flex-col text-center justify-center items-center gap-4"
      ref={ref}
      data-animation="hoverInTop"
    >
      <BaseHeading
        headingWord={headingWord}
        headingGradientWord={headingGradientWord}
        animationClass="hoverInBottom"
        className="text-center gradient-underline"
        trigger="scroll"
      />
      <p className="text-muted">{description}</p>
    </div>
  );
}

export default Heading;
