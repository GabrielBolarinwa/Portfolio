import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Allura } from "next/font/google";

import "./style.css";
import "./variables.css";
import "./fonts.css";
import BootstrapClient from "@/components/BootstrapClient";

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
      className={`${spaceGrotesk.variable} ${inter.variable} ${allura.variable}`}
    >
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
