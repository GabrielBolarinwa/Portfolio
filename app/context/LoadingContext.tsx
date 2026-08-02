"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface LoadingContextValue {
  progress: number;
}

const LoadingContext = createContext<LoadingContextValue>({ progress: 0 });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);

  const advance = (pct: number) => {
    setProgress((prev) => (pct > prev ? pct : prev));
  };

  useEffect(() => {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      advance(33);
    } else {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") advance(33);
        if (document.readyState === "complete") advance(66);
      });
    }

    if (document.readyState === "complete") {
      advance(66);
    } else {
      window.addEventListener("load", () => advance(66), { once: true });
    }

    document.fonts.ready.then(() => advance(100));
  }, []);

  const value = useMemo(() => ({ progress }), [progress]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  return useContext(LoadingContext);
}
