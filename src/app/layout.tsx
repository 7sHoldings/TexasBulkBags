import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { site } from "@/lib/site";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Texas Bulk Bags | Industrial FIBC Bulk Bag Solutions",
    template: "%s | Texas Bulk Bags",
  },
  description:
    "Texas Bulk Bags supplies heavy-duty FIBC bulk bags (super sacks) for agriculture, chemical, and construction industries. Stock and custom configurations, UN-rated and food-grade options, engineered in Kerens, TX.",
  keywords: [
    "bulk bags",
    "FIBC",
    "super sacks",
    "Texas bulk bags",
    "U-panel bulk bag",
    "circular bulk bag",
    "UN rated bulk bags",
    "food grade FIBC",
  ],
  openGraph: {
    title: "Texas Bulk Bags | Industrial FIBC Bulk Bag Solutions",
    description:
      "Heavy-duty FIBC bulk bags for agriculture, chemical, and construction. Stock and custom configurations, engineered in Kerens, TX.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="industrial-grid flex min-h-full flex-col bg-surface text-on-surface">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
