import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import DeferredSystemThemeSync from "@/components/lazy/DeferredSystemThemeSync";
import themeSnippet from "@/theme-snippet.json";
import "@/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  title: "Anna Saltveit · Frontend developer & designer",
  description:
    "Frontend developer and designer building responsive, accessible interfaces with React, Next.js, and TypeScript. Based in San Francisco.",
  keywords: [
    "frontend developer",
    "UI developer",
    "design systems",
    "accessibility",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "San Francisco",
    "web design",
  ],
  creator: "Anna Saltveit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth" suppressHydrationWarning>
      <head>
        <style
          data-theme-init
          dangerouslySetInnerHTML={{ __html: themeSnippet.style }}
        />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeSnippet.script }}
        />
        <DeferredSystemThemeSync />
        {children}
      </body>
    </html>
  );
}
