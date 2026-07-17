"use client";
import { educationItems } from "@/src/constants/about";
import Heading from "../Heading";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import Word from "./Word";

function Education() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12" id="education">
      <Heading word="My" gradientWord="Education" trigger="scroll" />
      <ul className="mt-5 education-timeline relative px-8 flex flex-col gap-4">
        {educationItems.map((education) => (
          <li
            key={education.text}
            className="edu-card bg-card-background flex flex-col gap-2 w-full md:w-4/5 lg:3/5 p-6 rounded-lg border-white/20 border relative z-3"
            ref={ref}
            data-animation="hoverInBottom"
          >
            <span className="text-accent-neon heading text-xs">
              {education.year.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                  <Word index={index} word={word} trigger="scroll" />{" "}
                </span>
              ))}
            </span>
            <h3 className="edu-card-header">
              {education.title.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                  <Word index={index} word={word} trigger="scroll" />{" "}
                </span>
              ))}
            </h3>
            <div className="text-muted text-sm">
              {education.detail && (
                <p>
                  {education.detail.split(" ").map((word, index) => (
                    <span key={`${word}-${index}`}>
                      <Word index={index} word={word} trigger="scroll" />{" "}
                    </span>
                  ))}
                </p>
              )}
              <p>
                {education.text.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`}>
                    <Word index={index} word={word} trigger="scroll" />{" "}
                  </span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Education;
