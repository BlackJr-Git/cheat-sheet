import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header, Footer, ScrollToTopButton } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

// const poppins = Poppins({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheat Sheet",
  description: "Trouver tout les sites ou outils dont vous avez besoin",
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
          <Analytics />
          <ScrollToTopButton />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
