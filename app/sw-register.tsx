"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      import("@serwist/window").then(({ Serwist }) => {
        const wb = new Serwist("/sw.js", { scope: "/" });
        wb.register();
      });
    }
  }, []);

  return null;
}
