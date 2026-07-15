import { skillItems } from "@/src/constants";
import React from "react";
import { GraduationCap, Lightbulb } from "lucide-react";

interface Props {
  setAnimationElements: (el: HTMLElement | null) => void;
}

function SkillsAndExperience(props: Props) {
  const { setAnimationElements } = props;
  const multiRef = (el: HTMLElement | null) => {
    el && setAnimationElements(el);
  };
  return (
    <section className="skills_and_experience" id="skills_and_experience">
      <div className="w-full px-3 sm:px-4 md:px-5">
        <div
          className="flex flex-wrap skills_and_experience_container"
          id="skills_and_experience_container"
        >
          <div className="skills_and_experience_section education">
            <h3 className="skills_and_experience_header">
              <GraduationCap color={"#f00eaffff"} fill={"#00eaff"} size={30} />
              Education
            </h3>
            <br />
            <ul>
              <li
                className="education_item"
                ref={setAnimationElements}
                style={{ "--i": "0" } as React.CSSProperties}
                data-animation="slideInLeft"
                tabIndex={0}
              >
                <h3>
                  O&apos;Level Education (
                  <abbr title="West African Examination Council">WAEC</abbr>{" "}
                  Certificate)
                </h3>
                <strong>
                  <a
                    href="https://upwaschools.com.ng/"
                    rel="nofollow"
                    target="_blank"
                    className="certificate-link"
                  >
                    UPWA International Secondary School
                  </a>
                </strong>
              </li>
              <li
                className="education_item"
                ref={setAnimationElements}
                style={
                  { "--i": "0" } as React.CSSProperties as React.CSSProperties
                }
                data-animation="slideInLeft"
                tabIndex={0}
              >
                <h3>Frontend Web Development Certification</h3>
                <strong>
                  <a
                    href="https://www.udemy.com/course/the-ultimate-front-end-web-development-course/"
                    target="_blank"
                    rel="nofollow"
                    className="certificate-link"
                  >
                    Udemy Online Courses
                  </a>
                </strong>
                <br />
                <strong>
                  Instructor: <em>Supriyo Kundu</em>
                </strong>
              </li>
            </ul>
          </div>
          <div className="skills_and_experience_section skills">
            <h3 className="skills_and_experience_header">
              <Lightbulb color={"#00eaff"} fill={"#00eaff"} size={30} />
              Skills
            </h3>
            <br />
            <ul className="skill-list gap-8 w-4/5 mx-auto" role="list">
              {skillItems.map((skill, index) => (
                <li
                  key={skill.id}
                  className="skill-item w-11/12 sm:w-7/12 md:w-5/12 lg:w-3/12 html"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
                  tabIndex={0}
                  data-animation="hoverInTop"
                >
                  <div className="text">
                    <p className={"flex gap-2 items-center justify-center"}>
                      <skill.icon color={skill.iconColor} size={24} />
                      {skill.skill}
                    </p>
                    <p className="skill-rating mt-2">{skill.mastery}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsAndExperience;
