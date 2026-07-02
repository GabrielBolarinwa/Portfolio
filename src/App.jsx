import { Header } from "./components/Header";
import "./assets/style.css";
import "./assets/fontawesome-pro/css/all.css";
import { HeroArea } from "./components/HeroArea";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import { BubblesBackground } from "./components/BubblesBackground";
import { Loader } from "./components/Loader";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [loaded, setLoaded] = useState(false);
  setTimeout(() => {
    setLoaded(document.readyState === "complete");
  }, 2000);

  const aboutSection = useRef(null);
  const aboutElements = useRef([]);
  const servicesSection = useRef(null);
  const servicesRow1 = useRef(null);
  const servicesRow2 = useRef(null);
  const portfolioSection = useRef(null);
  const portfolioElements = useRef([]);
  const projectsSection = useRef(null);

  function addAnimationClass(element) {
    element.style.opacity = "1";
    element.style.visibility = "visible";
    let animationClass = element.getAttribute("data-animation");
    element.classList.add(animationClass);
  }

  let headerElem = useRef(null);
  useEffect(() => {
    const scrollMarginElements = [
      aboutSection,
      servicesSection,
      portfolioSection,
      projectsSection,
    ];
    const animationElements = [];
    const addMargins = () => {
      scrollMarginElements.forEach((scrollMarginElement) => {
        scrollMarginElement.current.style.scrollMargin = `${headerElem.current.offsetHeight}px`;
      });
    };
    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addAnimationClass(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    const checkAllLoaded = () => {
      if (document.readyState === "complete") {
        document.fonts.ready.then(() => {
          if (document.fonts.status === "loaded") {
            setLoaded(true);
          }
        });
      }
    };
    if (!loaded) {
      document.addEventListener("readystatechange", checkAllLoaded);
      window.addEventListener("load", () => checkAllLoaded);
    }

    if (window.innerWidth >= 768) {
      animationElements.push(servicesRow1.current, servicesRow2.current);
    }
    aboutElements.current.forEach((aboutElement) => {
      animationElements.push(aboutElement);
    });
    portfolioElements.current.forEach((portfolioElement) => {
      animationElements.push(portfolioElement);
    });
    animationElements.forEach((animationElement) => {
      animationElement.style.opacity = "0";
      animationElement.style.visibility = "hidden";
      observer1.observe(animationElement);
    });

    addMargins();

    return () => {
      observer1.disconnect();
      document.removeEventListener("readystatechange", checkAllLoaded);
      window.removeEventListener("loaded", checkAllLoaded);
    };
  }, [loaded]);

  return (
    <>
      <SpeedInsights />
      {!loaded && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      <div className="bubbles-container">
        <BubblesBackground />
      </div>
      <Header headerElem={headerElem} addAnimationClass={addAnimationClass} />
      <main
        id="main"
        role="main"
        data-bs-spy="scroll"
        data-bs-target="#menu"
        tabIndex="0"
      >
        <HeroArea />
        <About aboutRef={aboutSection} aboutElements={aboutElements} />
        <Services
          servicesSection={servicesSection}
          servicesRow1={servicesRow1}
          servicesRow2={servicesRow2}
        />
        <Portfolio
          portfolioRef={portfolioSection}
          portfolioElements={portfolioElements}
        />
        <Projects projectsRef={projectsSection} />
        <br />
      </main>
      <Footer />
    </>
  );
}

export default App;
