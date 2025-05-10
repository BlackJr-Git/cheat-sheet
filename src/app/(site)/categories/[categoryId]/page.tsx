import { Metadata, ResolvingMetadata } from "next";
import { CategoryType } from "@/types";
import axios from "axios";
import dynamic from "next/dynamic";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Dynamically import the client component with no SSR
const CategoryContent = dynamic(
  () => import('./categoryContent'),
  { ssr: false }
);

// Generate dynamic metadata for each category page
export async function generateMetadata(
  { params }: { params: { categoryId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch category data for metadata
  let categoryData;
  try {
    const { data } = await axios.get(
      `${apiUrl}/api/category/${params.categoryId}`
    );
    categoryData = data.category;
  } catch (error) {
    console.error('Error fetching metadata for category:', error);
    // Return default metadata if fetch fails
    return {
      title: 'Catégorie | The Cheat Sheet',
      description: 'Découvrez les outils de cette catégorie sur The Cheat Sheet',
    };
  }

  return {
    title: `${categoryData.name} | The Cheat Sheet`,
    description: `Découvrez les meilleurs outils de ${categoryData.name} sur The Cheat Sheet`,
    alternates: {
      canonical: `/categories/${params.categoryId}`,
    },
    openGraph: {
      title: categoryData.name,
      description: `Découvrez les meilleurs outils de ${categoryData.name} sur The Cheat Sheet`,
      url: `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.categoryId}`,
      type: 'article',
      images: categoryData.image ? [categoryData.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: categoryData.name,
      description: `Découvrez les meilleurs outils de ${categoryData.name} sur The Cheat Sheet`,
      images: categoryData.image ? [categoryData.image] : [],
    },
  };
}

// Server component that renders the client component
export default function Page({ params }: { params: { categoryId: string } }) {
  return <CategoryContent categoryId={params.categoryId} />;
}
