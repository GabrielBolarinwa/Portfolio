import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  Allura,
  Cinzel_Decorative,
} from "next/font/google";

import "./style.css";
import "./variables.css";
import React from "react";
import GradientDefs from "@/components/svgs/GradientDefs";
import { LoadingProvider } from "@/app/context/LoadingContext";
import { HeroArea } from "@/components/HeroArea";
import { About } from "@/components/About";
import { BubblesBackground } from "@/components/BubblesBackground";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import useLoadingState from "@/src/hooks/useLoadingState";
import { Loader } from "@/components/Loader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
});

const cinzel = Cinzel_Decorative({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  themeColor: "#806b6d4",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Bolarinwa Gabriel | Web Developer Portfolio",
  description: "Web Developer Portfolio for Bolarinwa Gabriel",
  keywords: "Portfolio, Web Developer, UI / UX Designer, Javascript Developer",
  robots: "index, follow",
  openGraph: {
    title: "Bolarinwa Gabriel | Web Developer Portfolio",
    description:
      "This is a website showing information on a programmer named Bolarinwa Gabriel",
    type: "website",
    images: ["https://gabrielbolarinwa.vercel.app/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${allura.variable} ${cinzel.variable} dark`}
    >
      <body>
        <LoadingProvider>
          <GradientDefs />
          <Loader />
          <div className="bubbles-container">
            <BubblesBackground />
          </div>
          <Header />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
