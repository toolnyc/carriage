import type { Metadata } from "next";
import { skandia } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carriageclub.nyc"),
  title: "Carriage Club",
  icons: {
    icon: [
      { url: "/brand/favicon-c.svg", type: "image/svg+xml" },
      { url: "/brand/icon@3x.png", type: "image/png", sizes: "any" },
    ],
    apple: "/brand/icon@3x.png",
  },
  openGraph: {
    title: "Carriage Club",
    siteName: "Carriage Club",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carriage Club",
    images: ["/images/og.jpg"],
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
