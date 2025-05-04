import type { Metadata } from "next";
import "./globals.css";
import { Julee } from "next/font/google";

export const metadata: Metadata = {
  title: "exandoe",
  description: "Play X and O in real time",
};

export const julee = Julee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${julee.className} antialiased`}>{children}</body>
    </html>
  );
}
