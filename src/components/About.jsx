import { useRef } from "react";

export function About({ aboutRef, aboutElements }) {
  const multiRef = (el) => {
    setAnimationElements(el);
  };
  const ageElem = useRef(null);

  let age = Math.floor((new Date() - new Date("2008-12-15")) / 31557600000);

  const setAnimationElements = (el) => {
    if (el && !aboutElements.current.includes(el)) {
      aboutElements.current.push(el);
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
            style={{ "--i": "0" }}
          >
            <h2 className="section-title">About Me</h2>
            <h3>Web Developer &amp; Aspiring Full Stack Developer</h3>
            <p className="section-content">
              Hi, I'm Bolarinwa Gabriel, a{" "}
              <span id="age" ref={ageElem}>
                {age}
              </span>
              -year-old web developer with solid skills in HTML, CSS, and
              JavaScript. I'm currently expanding my expertise into modern
              frameworks like React.js, Angular.js, and Vue.js, while also
              learning TypeScript, OAuth, and Jest for testing.
            </p>
            <p className="section-content">
              I'm proficient with development tools including NPM, Gulp.js, Git,
              and GitHub, and I have experience with Figma for UI/UX design. I'm
              passionate about learning new technologies and excel at
              researching solutions to development challenges.
            </p>
            <a href="#footer" className="about-contact">
              Contact
            </a>
          </div>
        </div>
      </div>

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
                  style={{ "--i": "0" }}
                  data-animation="slideInLeft"
                  tabIndex={"0"}
                >
                  <h3>
                    O'Level Education (
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
                  style={{ "--i": "0" }}
                  data-animation="slideInLeft"
                  tabIndex={"0"}
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
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 html"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0" }}
                  tabIndex={"0"}
                  data-animation="hoverInTop"
                >
                  <div className="text">
                    <p>
                      <span
                        className="fa-brands  fa-html5"
                        style={{ color: "orangered" }}
                      ></span>{" "}
                      HTML
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 css"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0.2" }}
                  tabIndex={"0"}
                  data-animation="hoverInTop"
                >
                  <div className="text">
                    <p>
                      <span
                        className="fa-brands  fa-css3-alt"
                        style={{ color: "steelblue" }}
                      ></span>{" "}
                      CSS
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 javascript"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0.4" }}
                  data-animation="hoverInTop"
                  tabIndex={"0"}
                >
                  <div className="text">
                    <p>
                      <span
                        className="fa-brands  fa-js-square"
                        style={{ color: "yellow" }}
                      ></span>{" "}
                      Javascript
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 javascript"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0.4" }}
                  data-animation="hoverInTop"
                  tabIndex={"0"}
                >
                  <div className="text">
                    <p>
                      <span
                        className="bi bi-typescript"
                        style={{ color: "#3178c6" }}
                      ></span>{" "}
                      Typescript
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 react"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0" }}
                  data-animation="hoverInTop"
                  tabIndex={"0"}
                >
                  <div className="text">
                    <p>
                      <span
                        className="fa-brands  fa-react"
                        style={{ color: "dodgerblue" }}
                      ></span>{" "}
                      React
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 angular"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0.2" }}
                  tabIndex={"0"}
                  data-animation="hoverInTop"
                >
                  <div className="text">
                    <p>
                      <span
                        className="fa-brands  fa-angular"
                        style={{ color: "Red" }}
                      ></span>{" "}
                      Angular
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
                <li
                  className="skill-item col-11 col-sm-7 col-md-5 col-lg-3 vue"
                  ref={multiRef}
                  role="listitem"
                  style={{ "--i": "0.4" }}
                  data-animation="hoverInTop"
                  tabIndex={"0"}
                >
                  <div className="text">
                    <p>
                      <span
                        className="fa-brands fa-vuejs"
                        style={{ color: "green" }}
                      ></span>{" "}
                      Vue
                    </p>
                    <p className="skill-rating">Expert</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
