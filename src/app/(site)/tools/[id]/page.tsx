"use client";

import { BookmarkButton, LikeButton, Loader } from "@/components";
import { Button } from "@/components/ui/button";
import { Eye, Share } from "lucide-react";
import Image from "next/image";
import { getToolCategories } from "@/actions/categoriesActions";
import { useEffect, useState } from "react";
import SharePopover from "@/components/dialog/sharePopover";
import { useRouter } from "next/navigation";

interface Tool {
  id: number;
  title: string;
  image: string;
  description: string;
  url: string;
  published: boolean;
  categories?: Category[];
  slug: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

/**
 * SingleToolPage is a React component that displays detailed information about a specific tool.
 *
 * It fetches tool data from an API using the provided tool ID, and displays the tool's image, title,
 * description, and categories. Additionally, it provides buttons for visiting the tool's website,
 * bookmarking the tool, liking the tool, and sharing the tool.
 *
 * Props:
 * - params: An object containing the tool ID which is used to fetch the tool data.
 *
 * State:
 * - tool: An object containing the tool's details, or null if the data has not been loaded yet.
 *
 * Side-effects:
 * - Uses the `useEffect` hook to fetch tool data when the component mounts or when the ID changes.
 */
export default function SingleToolPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<Tool | null>(null);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    async function fetchToolData() {
      try {
        const toolData = await getToolCategories(id);

        // Transformation des catégories
        const formattedCategories = toolData?.categories?.map((item: any) => ({
          id: item.category.id,
          name: item.category.name,
          icon: item.category.icon,
        }));

        // Vérifier que toutes les propriétés requises sont présentes
        if (
          toolData &&
          toolData.id &&
          toolData.title &&
          toolData.image &&
          toolData.description &&
          toolData.url &&
          typeof toolData.published === "boolean"
        ) {
          setTool({
            ...toolData,
            categories: formattedCategories,
          });
        } else {
          console.error("Données incomplètes pour l'outil :", toolData);
          router.push("/tools");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'outil :", error);
      }
    }

    fetchToolData();
  }, [id]);

  if (!tool) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  return (
    <main className="container flex flex-col items-center justify-center py-12 min-h-[80vh]">
      <section className="flex flex-col md:flex-row gap-4 h-full justify-center">
        <div className="md:w-1/2 px-4">
          <Image
            src={tool.image}
            alt={tool.title}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-xl drop-shadow-lg"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between px-4">
          {/* <div> */}
          <h2 className="text-3xl font-bold mb-8">{tool.title}</h2>
          <p className="text-lg mb-4">{tool.description}</p>
          <div className="flex flex-wrap gap-4 my-2 px-4">
            {tool.categories?.map((category) => (
              <span
                key={`${category.id}__category`}
                className="text-lg font-semibold flex items-center gap-2 border-2 bg-violet-200 border-violet-300 rounded-full px-4 py-2"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </span>
            ))}
            {/* </div> */}
          </div>
          <div className="flex gap-4">
            <Button className="text-lg">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-lg grow flex gap-4 items-center justify-center"
              >
                Visiter le site <Eye />
              </a>
            </Button>
            <BookmarkButton toolId={tool.id} />
            <LikeButton likes={0} id={tool.id} />
            {/* <Button className="text-lg flex gap-2 bg-transparent hover:bg-green-200 border-green-300 text-green-500">
              <Share />
            </Button> */}
            <SharePopover
              title={tool.title}
              url={`${process.env.NEXT_PUBLIC_API_URL}/tools/${tool.slug}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
