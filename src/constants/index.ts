import {
  SiReact
} from "@icons-pack/react-simple-icons";
import {
  Gauge,
  PencilRuler,
  Plug2,
  ShieldHalf
} from "lucide-react";


export const services = [
  {
    icon: PencilRuler,
    serviceName: "UI/UX Implementation",
    serviceDescription:
      "Design-to-code translation, responsive layouts, and building scalable design systems",
  },
  {
    icon: SiReact,
    serviceName: "Frontend Engineering",
    serviceDescription:
      "React/Vue/Angular development TypeScript, state management and routing",
  },
  {
    icon: Gauge,
    serviceName: "Performance Optimization",
    serviceDescription:
      "Lazy loading, code splitting, PWA Implementation and performance auditing",
  },
  {
    icon: Plug2,
    serviceName: "API Integration",
    serviceDescription:
      "REST APIs, JWT/OAuth authentication, and asynchronouss data handling",
  },
  {
    icon: ShieldHalf,
    serviceName: "Accessibility & Security",
    serviceDescription:
      "WCAG/ARIA compliance, XSS prevention and Content Security Policy (CSP)",
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
