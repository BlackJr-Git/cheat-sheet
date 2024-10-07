import {
  HeroSection,
  Categories,
  BestTools,
  MostRecentTools,
  HighlightSection,
  NewsletterSection,
} from "@/components";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="The Cheat Sheet" />
          <meta
            property="og:description"
            content="Trouver tous les sites ou outils dont vous avez besoin pour gagner du temps et de la productivité"
          />
          <meta
            property="og:image"
            content="https://the-cheat-sheet.vercel.app/homepage-1.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:url"
            content="https://the-cheat-sheet.vercel.app/"
          />
          <meta property="og:site_name" content="The Cheat Sheet" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="The Cheat Sheet" />
          <meta
            name="twitter:description"
            content="Trouver tous les sites ou outils dont vous avez besoin pour gagner du temps et de la productivité"
          />
          <meta
            name="twitter:image"
            content="https://the-cheat-sheet.vercel.app/homepage-1.png"
          />
          <meta name="twitter:site" content="@JuniorAsosa" />

          <title>
            The Cheat Sheet | Tous les sites et outils qui vous rendent plus
            productif
          </title>
          <meta
            name="description"
            content="Trouver tous les sites ou outils dont vous avez besoin pour gagner du temps et de la productivité"
          />
        </Head>
      </Head>
      <main className="py-12">
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
