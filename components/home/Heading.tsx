"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";

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
      <h2 className="text-center section-title">
        {headingWord}{" "}
        <span className="bg-clip-text text-transparent bg-(image:--primary-gradient)">
          {headingGradientWord}
        </span>
      </h2>
      <p className="text-muted">{description}</p>
    </div>
  );
}

export default Heading;
