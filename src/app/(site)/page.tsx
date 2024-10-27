import {
  HeroSection,
  Categories,
  BestTools,
  MostRecentTools,
  HighlightSection,
  NewsletterSection,
} from "@/components";
import Head from "next/head";

export const metadata = {
  title:
    "The Cheat Sheet | Toutes les ressources qui vous rendent plus productif",
  description:
    "Trouver toutes les ressources dont vous avez besoin pour gagner du temps et de la productivité",
  openGraph: {
    type: "website",
    title: "The Cheat Sheet",
    description:
      "Trouver toutes les ressources dont vous avez besoin pour gagner du temps et de la productivité",
    url: "https://the-cheat-sheet.vercel.app/",
    siteName: "The Cheat Sheet",
    images: [
      {
        url: "https://the-cheat-sheet.vercel.app/homepage-2.png",
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
    images: ["https://the-cheat-sheet.vercel.app/homepage-1.png"],
    site: "@JuniorAsosa",
  },
};

export default function Home() {
  return (
    <div>
      <main className="py-8 min-h-screen">
        <HeroSection />
        <Categories />
        <HighlightSection />
        <BestTools />
        <MostRecentTools />
        <NewsletterSection />
      </main>
    </div>
  );
}
