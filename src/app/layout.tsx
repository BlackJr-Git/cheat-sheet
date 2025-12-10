import type { Metadata } from "next";
import { Montserrat, Poppins, Oxanium } from "next/font/google";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ScrollToTopButton } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProvider from "@/providers/QueryProvider";
import { Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"], // ou ['latin', 'vietnamese'] selon ton besoin
  weight: ["200", "300", "400", "500", "600", "700", "800"], // choisis les weights que tu veux
  variable: "--font-plus-jakarta", // pour utiliser avec Tailwind ou CSS vars
});

// const poppins = Poppins({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "The Cheat Sheet | Toutes les ressources qui vous rendent plus productif",
  description:
    "Trouver toutes les ressources dont vous avez besoin pour gagner du temps et de la productivité",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "The Cheat Sheet",
    description:
      "Trouver toutes les ressources dont vous avez besoin pour gagner du temps et de la productivité",
    url: "https://the-cheat-sheet.vercel.app/",
    siteName: "The Cheat Sheet",
    images: [
      {
        url: "https://the-cheat-sheet.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The Cheat Sheet Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cheat Sheet",
    description:
      "Trouver toutes les ressources dont vous avez besoin pour gagner du temps et de la productivité",
    images: ["https://the-cheat-sheet.vercel.app/twitter-image.png"],
    site: "@JuniorAsosa",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={plusJakartaSans.className}>
          <QueryProvider>
            {children}
            <ScrollToTopButton />
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
