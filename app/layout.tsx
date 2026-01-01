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
  title: "Anna Saltveit",
  description: "Anna Saltveit's portfolio website",
  keywords: ['Next.js', 'React', 'TypeScript', 'Front-end Development', 'web developer', 'TailwindCSS', 'San Francisco', 'JavaScript', 'Python', 'PostgreSQL'],
  creator: 'Anna Saltveit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}