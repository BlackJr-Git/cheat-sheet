import type { Metadata } from "next";
import { Montserrat, Poppins , Oxanium } from "next/font/google";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ScrollToTopButton } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

// const poppins = Poppins({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheat Sheet",
  description: "Trouver tout les sites ou outils dont vous avez besoin",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={montserrat.className}>
          {children}
          <ScrollToTopButton />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
