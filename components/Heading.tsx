"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";

interface Props {
  headingWord: string;
  headingGradientWord?: string;
  className?: string;
  animationClass?: string;
  trigger?: "load" | "scroll";
}

function Heading(props: Props) {
  const {
    headingWord,
    headingGradientWord,
    trigger,
    className,
    animationClass,
  } = props;
  const setRef = useScrollAnimationList();
  const setRef2 = useLoadAnimation();
  return (
    <h2
      className={`section-title ${className || ""}`}
      ref={trigger ? (trigger === "load" ? setRef : setRef2) : null}
      data-animation={animationClass || ""}
      style={{ "--i": "1.0" } as React.CSSProperties}
    >
      {headingWord}{" "}
      {headingGradientWord && (
        <span
          className="bg-clip-text text-transparent bg-(image:--primary-gradient) inline-block"
          ref={trigger ? (trigger === "load" ? setRef : setRef2) : null}
          style={{ "--i": "1.5" } as React.CSSProperties}
          data-animation="slideInRightCustom"
        >
          {headingGradientWord}
        </span>
      )}
    </h2>
  );
}

export default Heading;
