"use client";
import { educationItems } from "@/src/constants/about";
import Heading from "../Heading";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";

function Education() {
  const ref = useScrollAnimationList();
  return (
    <section className="mt-12">
      <Heading word="My" gradientWord="Education" trigger="scroll" />
      <ul className="mt-5 education-timeline px-8 flex flex-col gap-4">
        {educationItems.map((education) => (
          <li
            key={education.text}
            className="edu-card bg-card-background flex flex-col gap-2 w-full md:w-3/5 p-6 rounded-lg border-white/20 border overflow-hidden"
          >
            <span className="text-accent-neon heading text-xs">
              {education.year.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                  <span
                    className="inline-block"
                    ref={ref}
                    data-animation="slideInRightCustom"
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </span>
            <h3 className="edu-card-header">
              {education.title.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                  <span
                    className="inline-block"
                    ref={ref}
                    data-animation="slideInRightCustom"
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h3>
            <div className="text-muted text-sm">
              {education.detail && (
                <p>
                  {education.detail.split(" ").map((word, index) => (
                    <span key={`${word}-${index}`}>
                      <span
                        className="inline-block"
                        ref={ref}
                        data-animation="slideInRightCustom"
                      >
                        {word}
                      </span>{" "}
                    </span>
                  ))}
                </p>
              )}
              <p>
                {education.text.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`}>
                    <span
                      className="inline-block"
                      ref={ref}
                      data-animation="slideInRightCustom"
                    >
                      {word}
                    </span>{" "}
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
