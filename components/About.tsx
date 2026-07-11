"use client";
import { type RefObject, useRef } from "react";
import SkillsAndExperience from "./SkillsAndExperience";

interface Props {
  aboutRef: RefObject<HTMLElement | null>;
  aboutElements: RefObject<HTMLElement[] | null>;
}

export function About({ aboutRef, aboutElements }: Props) {
  const ageElem = useRef(null);

  const age = Math.floor(
    (Number(new Date()) - Number(new Date("2008-12-15"))) / 31557600000,
  );

  const setAnimationElements = (el: HTMLElement | null) => {
    if (el && !aboutElements.current?.includes(el)) {
      aboutElements.current?.push(el);
    }
  };

  return (
    <section
      className="about"
      data-animation="slideInLeft"
      id="about"
      ref={aboutRef}
    >
      <div className="container-fluid">
        <div className="row about-container">
          <div
            ref={setAnimationElements}
            data-animation="slideInTop"
            style={
              {
                "--i": "0",
              } as React.CSSProperties as React.CSSProperties as React.CSSProperties
            }
          >
            <h2 className="section-title">About Me</h2>
            <h3>Web Developer &amp; Aspiring Full Stack Developer</h3>
            <p className="section-content">
              Hi, I&apos;m Bolarinwa Gabriel, a{" "}
              <span id="age" ref={ageElem}>
                {age}
              </span>
              -year-old web developer with solid skills in HTML, CSS, and
              JavaScript. I&apos;m currently expanding my expertise into modern
              frameworks like React.js, Angular.js, and Vue.js, while also
              learning TypeScript, OAuth, and Jest for testing.
            </p>
            <p className="section-content">
              I&apos;m proficient with development tools including NPM, Gulp.js,
              Git, and GitHub, and I have experience with Figma for UI/UX
              design. I&apos;m passionate about learning new technologies and
              excel at researching solutions to development challenges.
            </p>
            <a href="#footer" className="about-contact">
              Contact
            </a>
          </div>
        </div>
      </div>
      <SkillsAndExperience setAnimationElements={setAnimationElements} />
    </section>
  );
}
