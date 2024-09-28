import {
  HeroSection,
  Categories,
  BestTools,
  MostRecentTools,
} from "@/components";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        {/* Balises de base pour Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Cheat Sheet" />
        <meta
          property="og:description"
          content="Trouver tout les sites ou outils dont vous avez besoin pour gagner du temps et de la productivité"
        />
        <meta
          property="og:image"
          content="https://the-cheat-sheet.vercel.app/homepage-1.png"
        />
        <meta property="og:url" content="https://the-cheat-sheet.vercel.app/" />
        <meta property="og:site_name" content="The Cheat Sheet" />

        {/* Balises pour Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Cheat Sheet" />
        <meta name="twitter:description" content="Trouver tout les sites ou outils dont vous avez besoin pour gagner du temps et de la productivité" />
        <meta
          name="twitter:image"
          content="https://the-cheat-sheet.vercel.app/homepage-1.png"
        />
        <meta name="twitter:site" content="@JuniorAsosa" />

        {/* Titre et description par défaut */}
        <title>
          The Cheat Sheet | Tout les sites et outils qui vous rendent plus
          productif
        </title>
        <meta
          name="description"
          content="Trouver tout les sites ou outils dont vous avez besoin pour gagner du temps et de la productivité"
        />
      </Head>
      <main className="container py-12">
        <HeroSection />
        <Categories />
        <BestTools />
        <MostRecentTools />
      </main>
    </div>
  );
}
