import React from "react";
import Providers from "../components/Providers";
import GamingBgAnimation from "../components/GamingBgAnimation";
import CustomCursor from "../components/CustomCursor";
import IntroCurtain from "../components/IntroCurtain";
import PixelCat from "../components/PixelCat";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Script from "next/script";
import localFont from "next/font/local";
import { Outfit, Press_Start_2P, Space_Mono } from "next/font/google";
import "../App.css";

// Headings & brand: Nasalization (self-hosted, from src/assets/fonts)
const nasalization = localFont({
  src: "../assets/fonts/nasalization-rg-webfont.woff2",
  weight: "400",
  style: "normal",
  variable: "--nf-display",
  display: "swap",
});

// Body text: Outfit
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--nf-sans",
  display: "swap",
});

// Labels, tags, badges: Space Mono
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--nf-mono",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--nf-pixel",
  display: "swap",
});

const GA_MEASUREMENT_ID = "G-9WE11TY9N7";

const SITE_DESCRIPTION =
  "Naseeh AN is a full-stack developer building modern web applications and mobile experiences with React, Next.js, Node.js, and React Native.";

export const metadata = {
  metadataBase: new URL("https://www.naseeh.in"),
  title: "Naseeh AN — Full-Stack Developer",
  description: SITE_DESCRIPTION,
  authors: [{ name: "Naseeh AN" }],
  icons: {
    icon: "/images/logo.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.naseeh.in",
    siteName: "Naseeh AN",
    title: "Naseeh AN — Full-Stack Developer",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Naseeh AN — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naseeh AN — Full-Stack Developer",
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#14171d",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${nasalization.variable} ${outfit.variable} ${spaceMono.variable} ${pressStart2P.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Anti-theme flash script: sets data-theme synchronously before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem("portfolio-theme");
                var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
                var theme = saved ? saved : (prefersLight ? "light" : "dark");
                document.documentElement.setAttribute("data-theme", theme);
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(theme);
                if (sessionStorage.getItem("intro-seen")) {
                  document.documentElement.setAttribute("data-intro-seen", "");
                }
              } catch (e) {}
            })();`,
          }}
        />
        <Providers>
          <IntroCurtain />
          <CustomCursor />
          <GamingBgAnimation />
          <PixelCat />
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "${GA_MEASUREMENT_ID}");`}
        </Script>
      </body>
    </html>
  );
}
