"use client";
import AboutPortrait from "@/components/about/AboutPortrait";
import {
  paragraph1,
  paragraph2,
  paragraph3,
  tools,
} from "@/src/constants/about";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";

function About() {
  const paragraph1words = paragraph1.split(" ");
  const paragraph2words = paragraph2.split(" ");
  const paragraph3words = paragraph3.split(" ");
  const setRef = useLoadAnimation();
  const setRef2 = useScrollAnimationList();
  return (
    <>
      <h2 className="mt-12" ref={setRef} data-animation="slideInLeftCustom">
        About{" "}
        <span
          className="bg-(image:--primary-gradient) text-transparent bg-clip-text  inline-block"
          ref={setRef}
          style={{ "--i": "1.5" } as React.CSSProperties}
          data-animation="slideInLeftCustom"
        >
          Me
        </span>
      </h2>
      <section className="mt-5">
        <AboutPortrait />
        <p>
          {paragraph1words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span
                ref={setRef}
                className="duration-1000! inline-block"
                data-animation="slideInRightCustom"
                style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <p className="mt-4 text-muted">
          {paragraph2words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span
                ref={setRef2}
                className="duration-1000! inline-block"
                data-animation="slideInRightCustom"
                style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <p className="mt-4 text-muted">
          {paragraph3words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span
                ref={setRef2}
                className="duration-1000! inline-block"
                data-animation="slideInRightCustom"
                style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <ul className="mt-10 flex flex-wrap gap-6">
          {tools.map((tool, index) => (
            <li
              key={tool.tool}
              className="bg-card-background p-6 flex flex-col items-center justify-center gap-4 font-headings font-medium w-[130px] aspect-[1]  border border-card-background hover:border-accent-pink hover:-translate-y-1 shadow-md group"
              ref={setRef2}
              data-animation="slideInTop"
              style={{ "--i": `0.${index}` } as React.CSSProperties}
            >
              <tool.icon className="text-accent-neon group-hover:text-accent-pink" />{" "}
              {tool.tool}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default About;
