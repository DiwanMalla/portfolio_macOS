import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
