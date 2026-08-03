"use client";

import { useNav } from "@/app/context/NavContext";
import { useEffect } from "react";

export default function ProjectsSections() {
  const { setSections } = useNav();
  useEffect(() => {
    setSections([
      { id: "case-studies", label: "Case Studies" },
      { id: "minor-projects", label: "Minor Projects" },
    ]);
    return () => setSections([]);
  }, [setSections]);

  return null;
}
