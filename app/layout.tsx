import type { Metadata } from "next";
import { Geist } from "next/font/google";
import DeferredSystemThemeSync from "@/components/lazy/DeferredSystemThemeSync";
import "@/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
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

// Matches --color-slate-50 in globals.css (light bg / dark bg tokens).
const themeFlashGuardStyle =
  "html,body{background-color:#f8fafc}html.dark,html.dark body{background-color:#0a0d11}";

const themeInitScript = `(function(){try{var theme=localStorage.getItem('theme');if(!theme){theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var root=document.documentElement;root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme==='dark'?'dark':'light';}catch{}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {/* Blocking theme init for dev; production HTML gets an earlier copy via postbuild. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <style dangerouslySetInnerHTML={{ __html: themeFlashGuardStyle }} />
        <DeferredSystemThemeSync />
        {children}
      </body>
    </html>
  );
}
