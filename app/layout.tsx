import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

// Runs before paint to set the theme class, avoiding a light/dark flash on load.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}