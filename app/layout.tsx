import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import {
  Allura,
  Cinzel_Decorative,
  Inter,
  Space_Grotesk,
} from "next/font/google";
import { LoadingProvider } from "@/app/context/LoadingContext";
import { BubblesBackground } from "@/components/BubblesBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import GradientDefs from "@/components/svgs/GradientDefs";
import React from "react";
import "./style.css";
import "./variables.css";
import { Toaster } from "@/components/ui/sonner";
import NavProvider from "@/app/context/NavContext";

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
      <body>
        <SpeedInsights />
        <NavProvider>
          <LoadingProvider>
            <GradientDefs />
            <Loader />
            <div className="bubbles-container">
              <BubblesBackground />
            </div>
            <Header />
            <main role="main">
              {children}
              {caseStudy}
              <Toaster />
            </main>
            <Footer />
          </LoadingProvider>
        </NavProvider>
      </body>
    </html>
  );
}
