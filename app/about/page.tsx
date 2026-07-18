import AboutPortrait from "@/components/about/AboutPortrait";
import ContactCard from "@/components/about/ContactCard";
import Education from "@/components/about/Education";
import Skills from "@/components/about/Skills";
import ToolList from "@/components/about/ToolList";
import Word from "@/components/about/Word";
import Heading from "@/components/Heading";
import { paragraph1, paragraph2, paragraph3 } from "@/src/constants/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Bolarinwa Gabriel",
};
function About() {
  const paragraph1words = paragraph1.split(" ");
  const paragraph2words = paragraph2.split(" ");
  const paragraph3words = paragraph3.split(" ");
  return (
    <>
      <Heading word={"About"} gradientWord="Me" trigger="load" />
      <section className="mt-5" id="about">
        <AboutPortrait />
        <p>
          {paragraph1words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <Word index={index} word={word} trigger="load" />{" "}
            </span>
          ))}
        </p>
        <p className="mt-4 text-muted">
          {paragraph2words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <Word index={index} word={word} trigger="scroll" />{" "}
            </span>
          ))}
        </p>
        <p className="mt-4 text-muted">
          {paragraph3words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <Word index={index} word={word} trigger="scroll" />{" "}
            </span>
          ))}
        </p>
        <ToolList />
        <ContactCard />
      </section>
      <Education />
      <Skills />
    </>
  );
}

export default About;
