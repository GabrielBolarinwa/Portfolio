import { Bug, CheckIcon, Monitor, Signal, Smartphone } from "lucide-react";
import {
  SiAngular,
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";

export const skillItems = [
  {
    id: "1",
    skill: "HTML",
    mastery: "Expert",
    icon: SiHtml5,
    iconColor: "#e34c26",
  },
  {
    id: "2",
    skill: "CSS",
    mastery: "Expert",
    icon: SiCss,
    iconColor: "#663399",
  },
  {
    id: "3",
    skill: "Javascript",
    mastery: "Expert",
    icon: SiJavascript,
    iconColor: "#f7df1e",
  },
  {
    id: "4",
    skill: "Typescript",
    mastery: "Expert",
    icon: SiTypescript,
    iconColor: "#3178c6",
  },
  {
    id: "5",
    skill: "React",
    mastery: "Expert",
    icon: SiReact,
    iconColor: "#61dbfb",
  },
  {
    id: "6",
    skill: "Angular",
    mastery: "Advanced",
    icon: SiAngular,
    iconColor: "#e40035",
  },
  {
    id: "7",
    skill: "Vue",
    mastery: "Expert",
    icon: SiVuedotjs,
    iconColor: "#41b883",
  },
];

export const services = [
  {
    icon: Monitor,
    serviceName: "Web Development",
    serviceDescription:
      "Build fast, responsive website with clean code and essential features",
  },
  {
    icon: Smartphone,
    serviceName: "Web App Development",
    serviceDescription:
      "Build dynamic web apps with React, Angular and Vue. Get flexible PWAs that adapt to your requirements",
  },
  {
    icon: Signal,
    serviceName: "Web Performance Analysis and Optimization",
    serviceDescription:
      "Optimize code, assets and images for faster load times and enhanced security",
  },
  {
    icon: Bug,
    serviceName: "Debugging",
    serviceDescription:
      "Identify and resolve bugs in codebases by tracing error sources per feature",
  },
  {
    icon: CheckIcon,
    serviceName: "Code Testing",
    serviceDescription:
      "Test code thoroughly for render and logic errors before deploying for production using tools like Cypress and Vitest",
  },
  {
    icon: SiFigma,
    serviceName: "UI/UX Design",
    serviceDescription:
      "Design user interfaces and prototypes using Figma and Lunacy following best practices for optimal user experiences",
  },
];

export const projects = [
  {
    name: "Weather Application",
    imageSrc: "/images/projects/weather-app.webp",
    imageAlt: "Weather app image",
    description:
      "Display real-time weather data and forecasts for any location via search using the WeatherAPI",
    projectLink: "https://gabrielbolarinwa-horizons.vercel.app",
    techTags: ["Vue.js", "CSS", "Pinia", "Typescript"],
  },
  {
    name: "Todo-List",
    imageSrc: "/images/projects/todo-list.webp",
    imageAlt: "Todo list image",

    description:
      "Manage and track tasks efficiently using class-based JavaScript architecture",
    projectLink: "https://gabrielbolarinwa-to-do-list.vercel.app",
    techTags: ["Angular", "CSS", "Typescript"],
  },
  {
    name: "Axiom",
    imageSrc: "/images/projects/calculator.webp",
    imageAlt: "Axiom image",

    description:
      "A full-featured calculator app with standard arithmetic operations and scientific functions including trigonometry (sin, cos, tan), logarithms, and square roots.",
    projectLink: "https://gabrielbolarinwa-axiom.vercel.app",
    techTags: ["Javascript", "CSS", "Algorithm"],
  },
  {
    name: "Password Generator",
    imageSrc: "/images/projects/password-generator.webp",
    imageAlt: "Password Generator image",

    description:
      "Generate strong, customizable passwords with uppercase, lowercase, numbers, and symbols",
    projectLink: "https://gabrielbolarinwa-password-generator.vercel.app",
    techTags: ["HTML", "CSS", "Javascript"],
  },
  {
    name: "Text-to-Speech Converter (TTS)",
    imageSrc: "/images/projects/text-speech-converter.webp",
    imageAlt: "Text-to-Speech Converter image",
    description:
      "Convert written text into natural speech using web speech synthesis technology.",
    projectLink: "https://gabrielbolarinwa-text-to-speech-converter.vercel.app",
    techTags: ["Javascript", "Speech API", "HTML", "CSS"],
  },
  {
    name: "Notes App",
    imageSrc: "/images/projects/notes-app.webp",
    imageAlt: "Notes app image",
    description:
      "A note-taking app width create, edit, delete and local storage functionality",
    projectLink: "https://gabrielbolarinwa-notes-app.vercel.app",
    techTags: ["HTML", "CSS", "Javascript"],
  },
];
