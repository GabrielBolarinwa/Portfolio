"use client";

import { useNav } from "@/app/context/NavContext";
import { useEffect } from "react";

export default function AboutSections() {
  const { setSections } = useNav();
  useEffect(() => {
    setSections([
      { id: "about", label: "About" },
      { id: "education", label: "Education" },
      { id: "skills", label: "Skills" },
      { id: "journey", label: "Learning Journey" },
    ]);
    return () => setSections([]);
  }, [setSections]);

  return null;
}
