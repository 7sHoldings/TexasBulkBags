import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://texasbulkbags.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Texas Bulk Bags | FIBC Super Sacks & Bulk Bag Supplier",
    template: "%s | Texas Bulk Bags",
  },
  description:
    "Texas Bulk Bags supplies durable FIBC bulk bags (super sacks) for agriculture, construction, and industrial use. Stock and custom sizes, fast Texas-based shipping, and volume pricing.",
  keywords: [
    "bulk bags",
    "FIBC",
    "super sacks",
    "Texas bulk bags",
    "industrial bags",
    "agricultural bulk bags",
  ],
  openGraph: {
    title: "Texas Bulk Bags | FIBC Super Sacks & Bulk Bag Supplier",
    description:
      "Durable FIBC bulk bags for agriculture, construction, and industrial use. Stock and custom sizes with fast Texas-based shipping.",
    url: siteUrl,
    siteName: "Texas Bulk Bags",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
