"use client";
import useLoadingState from "@/src/hooks/useLoadingState";
import { useEffect, useRef } from "react";

export function Loader() {
  const { progress } = useLoadingState();
  const loader = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (progress < 100) return;
    setTimeout(() => {
      if (loader.current) {
        loader.current.style.opacity = "0";
        loader.current.style.visibility = "visible";
        setTimeout(() => {
          (loader.current as HTMLDivElement).style.display = "none";
        }, 500);
      }
    }, 2000);
  });
  return (
    <div className="loader-container" ref={loader}>
      <div className="loader">
        <div className="face face1">
          <div className="circle"></div>
        </div>
        <div className="face face2">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}
