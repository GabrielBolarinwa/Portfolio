import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";

import { LoadingProvider } from "@/app/context/LoadingContext";
import NavProvider from "@/app/context/NavContext";
import { OrbBackground } from "@/components/OrbBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import IconRail from "@/components/IconRail";
import { Loader } from "@/components/Loader";
import GradientDefs from "@/components/svgs/GradientDefs";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Allura,
  Cinzel_Decorative,
  Inter,
  Space_Grotesk,
} from "next/font/google";
import React from "react";
import "./style.css";
import "./variables.css";
import { ServiceWorkerRegister } from "./sw-register";

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
  caseStudy,
}: Readonly<{
  children: React.ReactNode;
  caseStudy: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${allura.variable} ${cinzel.variable} dark`}
    >
      <body className={"mx-0! px-0! mr-0!"}>
        <SpeedInsights />
        <ServiceWorkerRegister />
        <NavProvider>
          <LoadingProvider>
            <TooltipProvider>
              <GradientDefs />
              <Loader />
              <div className="bubbles-container">
                <OrbBackground />
              </div>
              <Header />
              <IconRail />
              <main role="main">
                {children}
                {caseStudy}
                <Toaster />
              </main>
              <Footer />
            </TooltipProvider>
          </LoadingProvider>
        </NavProvider>
      </body>
    </html>
  );
}
