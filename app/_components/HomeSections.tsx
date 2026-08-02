"use client";

import { useNav } from "@/app/context/NavContext";
import { useEffect } from "react";

export default function HomeSections() {
  const { setSections } = useNav();
  useEffect(() => {
    setSections([
      { id: "intro", label: "Intro" },
      { id: "stats", label: "Stats" },
      { id: "services", label: "Services" },
      { id: "projects", label: "Projects" },
    ]);
    return () => setSections([]);
  }, [setSections]);

  return null;
}
