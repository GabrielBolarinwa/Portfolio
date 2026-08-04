import type { NextConfig } from "next";
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  swSrc: "worker/index.ts",
  fallbacks: {
    document: "/offline",
    image: "",
    font: "",
    video: "",
    audio: "",
  },
  additionalManifestEntries: [{ url: "/offline", revision: null }],
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default pwaConfig(nextConfig as Parameters<typeof pwaConfig>[0]);
