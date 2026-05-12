import type { Metadata, Viewport } from "next";
import { Caveat, Nunito } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

/** Rounded, friendly body type — reads softer than geometric sans for coaching copy. */
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ember — warm conversations, real growth",
  description:
    "Hi, I'm Ember. Your personal coach, here whenever you need me. A safe space to be real and move forward.",
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${nunito.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
