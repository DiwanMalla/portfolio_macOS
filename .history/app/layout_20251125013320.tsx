import type { Metadata } from "next";
import "./globals.css";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

export const metadata: Metadata = {
  title: "Mac OS Portfolio",
  description: "Interactive Mac OS-inspired portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProjectsProvider>{children}</ProjectsProvider>
      </body>
    </html>
  );
}
