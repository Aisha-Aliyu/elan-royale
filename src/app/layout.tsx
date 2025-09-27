import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";

// Load fonts as CSS variables
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

// Metadata for SEO + social preview
export const metadata: Metadata = {
  title: "ELÁN ROYALE | Fine Dining Restaurant",
  description: "Reserve your table at ELÁN ROYALE and indulge in an unforgettable fine dining experience.",
  keywords: ["Restaurant", "Fine Dining", "Sushi", "Luxury Dining", "ELÁN ROYALE"],
  authors: [{ name: "ELÁN ROYALE" }],
  creator: "ELÁN ROYALE",
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",

  // Open Graph (for LinkedIn, Facebook, etc.)
  openGraph: {
    title: "ELÁN ROYALE | Fine Dining Restaurant",
    description: "An evening to remember. Discover our luxury menu and reserve your table today.",
    url: "https://elanroyale.vercel.app", 
    siteName: "ELÁN ROYALE",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "ELÁN ROYALE Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter cards
  twitter: {
    card: "summary_large_image",
    title: "ELÁN ROYALE | Fine Dining Restaurant",
    description: "Luxury dining experience. Reserve your table today.",
    images: ["/android-chrome-512x512.png"],
    creator: "@elanroyale", // ⬅️ replace with your handle if available
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#d4af37" }, // optional if you add it
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}