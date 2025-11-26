import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

export const metadata: Metadata = {
  title: {
    default: "Diwan Malla | Full-Stack Developer Portfolio",
    template: "%s | Diwan Malla",
  },
  description:
    "Full-Stack Developer specializing in React, Next.js, TypeScript, and AI-powered applications. Explore my interactive macOS-style portfolio featuring projects, skills, and an AI digital twin.",
  keywords: [
    "Diwan Malla",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Frontend Developer",
    "Web Developer Sydney",
    "Portfolio",
    "Software Engineer",
    "AI Developer",
  ],
  authors: [{ name: "Diwan Malla", url: "https://portfolio-mac-os-three.vercel.app" }],
  creator: "Diwan Malla",
  publisher: "Diwan Malla",
  metadataBase: new URL("https://portfolio-mac-os-three.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://portfolio-mac-os-three.vercel.app",
    siteName: "Diwan Malla Portfolio",
    title: "Diwan Malla | Full-Stack Developer",
    description:
      "Interactive macOS-style portfolio showcasing my projects, skills, and AI-powered digital twin. Built with React, Next.js, and TypeScript.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diwan Malla - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwan Malla | Full-Stack Developer",
    description:
      "Interactive macOS-style portfolio with AI digital twin. Built with React, Next.js & TypeScript.",
    images: ["/images/og-image.png"],
    creator: "@diwanmalla",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <ProjectsProvider>{children}</ProjectsProvider>
        <Analytics />
      </body>
    </html>
  );
}
