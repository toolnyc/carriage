import type { Metadata } from "next";
import { skandia } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carriage",
  icons: {
    icon: [
      { url: "/brand/icon.svg", type: "image/svg+xml" },
      { url: "/brand/icon@3x.png", type: "image/png", sizes: "any" },
    ],
    apple: "/brand/icon@3x.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={skandia.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
