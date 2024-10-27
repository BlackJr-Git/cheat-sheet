import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Header, Footer } from "@/components";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

// const poppins = Poppins({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheat Sheet",
  description: "Trouver tout les sites ou outils dont vous avez besoin",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
