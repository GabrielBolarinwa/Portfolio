import { useCallback, useEffect, useRef } from "react";
export function Portfolio({ portfolioElements, portfolioRef }) {
  const portfolioContainer = useRef(null);
  const setAnimationElements = (el) => {
    if (el && !portfolioElements.current.includes(el)) {
      portfolioElements.current.push(el);
    }
  };
  const filterSelection = useCallback((c) => {
    var x, i;
    x = document.getElementsByClassName("portfolio-item");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) {
        w3AddClass(x[i], "show");
      }
    }
  }, []);

  function w3AddClass(element, name) {
    setTimeout(() => {
      element.style.display = "initial";
    }, 450);
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  function w3RemoveClass(element, name) {
    setTimeout(() => {
      element.style.display = "none";
    }, 450);

    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  useEffect(() => {
    filterSelection("all");
    var btns = document.querySelectorAll(".controls .filter button.filter-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.querySelectorAll(
          ".controls .filter button.filter-btn",
        );
        current.forEach((filter) => {
          filter.classList.remove("active");
        });
        this.classList.add("active");
      });
    }
    return () => {
      for (var i = 0; i < btns.length; i++) {
        btns[i].removeEventListener("click", function () {
          var current = document.querySelectorAll(
            ".controls .filter button.filter-btn",
          );
          Array(current).forEach((filter) => {
            console.log(filter[0].classList);
          });
          this.classList.add("active");
        });
      }
    };
  }, [filterSelection]);
  return (
    <section ref={portfolioRef} className="portfolio" id="portfolio">
      <div className="container-fluid">
        <div className="row">
          <div className="text-center">
            <h2 className=" section-title">Portfolio</h2>
          </div>
        </div>
        <div className="controls">
          <ul className="filter">
            <li>
              <button
                onClick={() => {
                  filterSelection("all");
                }}
                className="active filter-btn"
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  filterSelection("text-effects");
                }}
                className="filter-btn"
              >
                Text Effects
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  filterSelection("animations");
                }}
                className="filter-btn"
              >
                Animations
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  filterSelection("page-interactions");
                }}
                className="filter-btn"
              >
                Interactive Pages
              </button>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="portfolio-container p-0" ref={portfolioContainer}>
            <div
              className="portfolio-item page-interactions"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  loading="lazy"
                  src="/images/portfolio/digital-clock.webp"
                  height="370"
                  width="640"
                  alt="digital clock"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Digital Clock</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Digital-Clock"
                        target="_blank"
                        aria-label="View Digital Clock"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item text-effects"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.4" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  loading="lazy"
                  src="/images/portfolio/glowing-text.webp"
                  height="357"
                  width="640"
                  alt="glowing text"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Glowing Text Effect</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Glowing-Text-with-CSS/"
                        target="_blank"
                        aria-label="View Glowing Text Effect with CSS"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item animations"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.8" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  loading="lazy"
                  src="images/portfolio/hover-effects-with-css.webp"
                  alt="hover effects with CSS"
                  height="640"
                  width="441"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Hover Effects in CSS</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Hover-Effects-with-CSS/"
                        target="_blank"
                        aria-label="View Hover Effects with CSS"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item animations"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/loading-animations-1.webp"
                  height="244"
                  width="640"
                  loading="lazy"
                  alt="loading animations"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Random Loader Animations</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Loading-Animations"
                        target="_blank"
                        aria-label="View Loading Animations"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item page-interactions"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.4" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/temperature-converter.webp"
                  height="1079"
                  width="640"
                  loading="lazy"
                  alt="temperature converter"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Temperature Converter</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Temperature-Converter"
                        target="_blank"
                        aria-label="View Temperature Converter"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item page-interactions"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.8" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/new-year-countdown.webp"
                  height="512"
                  width="640"
                  loading="lazy"
                  alt="new year countdown"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">New Year Countdown</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/New-Year-Countdown"
                        target="_blank"
                        aria-label="View New Year Countdown"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item page-interactions"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/stopwatch.webp"
                  height="1079"
                  width="640"
                  loading="lazy"
                  alt="stopwatch"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Stopwatch</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Stopwatch"
                        target="_blank"
                        aria-label="View Stopwatch"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item text-effects"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.4" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/Text Fill Effect - Brave 2025-10-12 17-17-22~2.gif"
                  height="2874"
                  width="640"
                  loading="lazy"
                  alt="css code"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Text Fill Effect</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Text-Fill-Effect"
                        target="_blank"
                        aria-label="View Text Fill Effect"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item text-effects"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.8" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/image copy.webp"
                  height="1036"
                  loading="lazy"
                  width="640"
                  alt="reflection text effect"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Reflective Text Effect</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Shadow-Reflection-1-CSS/"
                        target="_blank"
                        aria-label="View Shadow Reflection Effect with CSS"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item text-effects"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/2025-10-14-14-22-12.webp"
                  height="1286"
                  loading="lazy"
                  width="640"
                  alt="Sliced Text"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Sliced Text Effect</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Sliced-Text-Effect-With-CSS/"
                        target="_blank"
                        aria-label="View Sliced Text Effect with CSS"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item page-interactions"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.4" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/quiz-app.webp"
                  height="1286"
                  loading="lazy"
                  width="640"
                  alt="quiz app"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Quiz App</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Quiz-App/"
                        target="_blank"
                        aria-label="View Quiz App"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="portfolio-item animations"
              data-animation="scaleIn"
              ref={setAnimationElements}
              style={{ "--i": "0.8" }}
              tabIndex={"0"}
            >
              <div className="portfolio-item-content">
                <img
                  decoding="async"
                  src="images/portfolio/loading-animations-2.webp"
                  height="1286"
                  loading="lazy"
                  width="640"
                  alt="loading animations 2"
                />
                <div className="img-overlay">
                  <div className="info w-100">
                    <div className="description">Abstract Animations</div>
                    <div className="item-icon">
                      <a
                        href="https://gabrielbolarinwa.github.io/Abstract-Animations/"
                        target="_blank"
                        aria-label="View Abstract Animations"
                        rel="noopener noreferrer"
                      >
                        <span className="bi bi-link-45deg"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
