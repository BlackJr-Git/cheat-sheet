import { Metadata } from "next";
import { CategoryCarousel, CategoryCard } from "@/components";
import { CategoryType } from "@/types";
import axios from "axios";
import Image from "next/image";

// Define metadata for the categories page
export const metadata: Metadata = {
  title: "Catégories | The Cheat Sheet",
  description: "Découvrez toutes les catégories d'outils de productivité sur The Cheat Sheet",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Catégories d'outils | The Cheat Sheet",
    description: "Découvrez toutes les catégories d'outils de productivité sur The Cheat Sheet",
    url: `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catégories d'outils | The Cheat Sheet",
    description: "Découvrez toutes les catégories d'outils de productivité sur The Cheat Sheet",
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function Page() {
  async function getCatagories() {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/category?number=24&pages=1`
      );
      return data.categories;
    } catch (error) {
      return [];
    }
  }

  const cate = (await getCatagories()) || [];

  return (
    <main className="container flex flex-col flex-wrap gap-4 py-12">
      <section className="relative mt-12">
        <div className="p-12 bg-violet-500/30 border-2 border-violet-400 flex justify-center items-center flex-col gap-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-semibold">
            Trouvez les meilleurs outils sur differents sujets
          </h1>
          <p className="text-lg">
            <span className="text-white bg-green-700 p-2">
              {cate?.length} categories
            </span>{" "}
            disponibles a la une. Trouvez celle dont vous avez besoin
          </p>
        </div>

        <Image
          src="/cheat-sheet-arrow-green.png"
          alt="hero icon"
          width={150}
          height={150}
          className="absolute bottom-0 left-0"
        />
        <Image
          src="/cheat-sheet-arrow-violet.png"
          alt="hero icon"
          width={150}
          height={150}
          className="absolute bottom-0 right-0"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cate.map((category: CategoryType) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </main>
  );
}

export default Page;
