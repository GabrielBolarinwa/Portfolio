import { skillItems } from "@/src/constants";
import React from "react";

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
      <div className="container-fluid">
        <div
          className="row skills_and_experience_container"
          id="skills_and_experience_container"
        >
          <div className="col-md-12 skills_and_experience_section education">
            <h3 className="skills_and_experience_header">
              {" "}
              <span
                className="fa fa-graduation-cap"
                style={{ paddingRight: "10px" }}
              ></span>{" "}
              Education
            </h3>
            <br />
            <ul>
              <li
                className="education_item"
                ref={setAnimationElements}
                style={
                  { "--i": "0" } as React.CSSProperties as React.CSSProperties
                }
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
          <div className="col-md-12 skills_and_experience_section skills">
            <h3 className="skills_and_experience_header">
              <span
                className="fa fa-lightbulb"
                style={{ paddingRight: "10px" }}
              ></span>{" "}
              Skills
            </h3>
            <br />
            <ul className="skill-list" role="list">
              {skillItems.map((skill, index) => (
                <li
                  key={skill.id}
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 html"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
                  tabIndex={0}
                  data-animation="hoverInTop"
                >
                  <div className="text">
                    <p>
                      <span
                        className={skill.iconClass}
                        style={{ color: skill.iconColor }}
                      ></span>{" "}
                      {skill.skill}
                    </p>
                    <p className="skill-rating">{skill.mastery}</p>
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
