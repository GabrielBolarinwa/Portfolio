import { useRef, useEffect } from "react";

export function Projects({ projectsRef }) {
  const setProjects = (el) => {
    if (el && !projects.current.includes(el)) {
      projects.current.push(el);
    }
  };
  const projects = useRef([]);
  useEffect(() => {
    const nodes = projects.current.slice();
    nodes.forEach((node) => {
      const onTouch = () => {
        node.classList.add("touched");
        setTimeout(() => {
          node.classList.remove("touched");
        }, 600);
      };
      const onClick = () => {
        node.classList.add("clicked");
        setTimeout(() => {
          node.classList.remove("clicked");
        }, 600);
      };
      node.addEventListener("touchstart", onTouch, { passive: true });
      node.addEventListener("click", onClick, { passive: true });
    });

    return () => {
      nodes.forEach((node) => {
        const onTouch = () => {
          node.classList.add("touched");
          setTimeout(() => {
            node.classList.remove("touched");
          }, 600);
        };
        const onClick = () => {
          node.classList.add("clicked");
          setTimeout(() => {
            node.classList.remove("clicked");
          }, 600);
        };
        node.removeEventListener("touchstart", onTouch);
        node.removeEventListener("click", onClick);
      });
    };
  }, []);
  return (
    <section
      ref={projectsRef}
      className="projects text-center"
      id="projects"
      data-animation="bounceInRight"
    >
      <div>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="container-fluid w-100">
        <div className="row mt-0">
          <div
            className="project col-12 col-sm-8 col-md-6 col-lg-4"
            ref={setProjects}
          >
            <figure className="card mb-3">
              <div className="project-preview-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/projects/weather-app.webp"
                  alt="weather app"
                  width={"325"}
                  height={"320"}
                />
              </div>
              <figcaption className="card-body">
                <div className="project-description ">
                  <h3>Weather Application</h3>
                  <p>
                    Display real-time weather data and forecasts for any
                    location via OpenWeatherMap API
                  </p>
                </div>

                <button className="btn btn-info project-btn">
                  <a
                    href="https://gabrielbolarinwa-weather-app.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Open Project <span className="fa fa-arrow-right"></span>
                  </a>
                </button>
                <div className="tags">
                  <span className="tag vue">Vue.js</span>
                  <span className="tag css">CSS</span>
                  <span className="tag javascript">JavaScript</span>
                  <span className="tag api">API</span>
                </div>
              </figcaption>
            </figure>
          </div>
          <div
            className="project col-12 col-sm-8 col-md-6 col-lg-4"
            ref={setProjects}
          >
            <figure className="card mb-3">
              <div className="project-preview-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/projects/todo-list.webp"
                  alt="to-do list"
                  height={"310"}
                  width={"277"}
                />
              </div>
              <figcaption className="card-body">
                <div className="project-description">
                  <h3>Todo-List</h3>
                  <p>
                    Manage and track tasks efficiently using class-based
                    JavaScript architecture
                  </p>
                </div>

                <button className="btn btn-info project-btn">
                  {" "}
                  <a
                    href="https://gabrielbolarinwa-to-do-list.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Open Project <span className="fa fa-arrow-right"></span>
                  </a>
                </button>
                <div className="tags">
                  <span className="angular tag">Angular</span>
                  <span className="tag css">CSS</span>
                  <span className="tag javascript">JavaScript</span>
                </div>
              </figcaption>
            </figure>
          </div>
          <div
            className="project col-12 col-sm-8 col-md-6 col-lg-4"
            ref={setProjects}
          >
            <figure className="card mb-3">
              <div className="project-preview-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/projects/calculator.webp"
                  alt="math calculator"
                  width="362"
                  height="310"
                />
              </div>
              <figcaption className="card-body">
                <div className="project-description">
                  <h3>Math Calculator</h3>
                  <p>
                    A full-featured calculator app with standard arithmetic
                    operations and scientific functions including trigonometry
                    (sin, cos, tan), logarithms, and square roots.
                  </p>
                </div>
                <button className="btn btn-info project-btn">
                  <a
                    href="https://gabrielbolarinwa-mathcalculator.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Open Project <span className="fa fa-arrow-right"></span>
                  </a>
                </button>
                <div className="tags">
                  <span className="html tag">HTML</span>
                  <span className="tag css">CSS</span>
                  <span className="tag javascript">JavaScript</span>
                </div>
              </figcaption>
            </figure>
          </div>
          <div
            className="project col-12 col-sm-8 col-md-6 col-lg-4"
            ref={setProjects}
          >
            <figure className="card mb-3">
              <div className="project-preview-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/projects/password-generator.webp"
                  alt="password generator"
                  height={"310"}
                  width={"379"}
                />
              </div>
              <figcaption className="card-body">
                <div className="project-description">
                  <h3>Password Generator</h3>
                  <p>
                    Generate strong, customizable passwords with uppercase,
                    lowercase, numbers, and symbols
                  </p>
                </div>

                <button className="btn btn-info project-btn">
                  <a
                    href="https://gabrielbolarinwa-password-generator.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Open Project <span className="fa fa-arrow-right"></span>
                  </a>
                </button>
                <div className="tags">
                  <span className="html tag">HTML</span>
                  <span className="tag css">CSS</span>
                  <span className="tag javascript">JavaScript</span>
                </div>
              </figcaption>
            </figure>
          </div>
          <div
            className="project col-12 col-sm-8 col-md-6 col-lg-4"
            ref={setProjects}
          >
            <figure className="card mb-3">
              <div className="project-preview-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/projects/text-speech-converter.webp"
                  alt="text-to-speech Converter"
                  width={"407"}
                  height={"357"}
                />
              </div>
              <figcaption className="card-body">
                <div className="project-description">
                  <h3>Text-to-Speech Converter (TTS Engine)</h3>
                  <p>
                    Convert written text into natural speech using web speech
                    synthesis technology
                  </p>
                </div>

                <button className="btn btn-info project-btn">
                  <a
                    href="https://gabrielbolarinwa-text-to-speech-converter.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Open Project <span className="fa fa-arrow-right"></span>
                  </a>
                </button>
                <div className="tags">
                  <span className="html tag">HTML</span>
                  <span className="tag css">CSS</span>
                  <span className="tag javascript">JavaScript</span>
                </div>
              </figcaption>
            </figure>
          </div>
          <div
            className="project col-12 col-sm-8 col-md-6 col-lg-4"
            ref={setProjects}
          >
            <figure className="card mb-3">
              <div className="project-preview-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/projects/notes-app.webp"
                  alt="notes app"
                  height={"267"}
                  width={"293"}
                />
              </div>
              <figcaption className="card-body">
                <div className="project-description">
                  <h3>Notes App</h3>
                  <p>
                    A note-taking app with create, edit, delete, and local
                    storage functionality
                  </p>
                </div>

                <button className="btn btn-info project-btn">
                  <a
                    href="https://gabrielbolarinwa-notes-app.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Open Project <span className="fa fa-arrow-right"></span>
                  </a>
                </button>
                <div className="tags">
                  <span className="html tag">HTML</span>
                  <span className="tag css">CSS</span>
                  <span className="tag javascript">JavaScript</span>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
