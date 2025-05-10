"use client";
import { ToolsCard, SkeletonCard } from "@/components";
import { Loader } from "@/components";
// Define the CategoryType interface with all needed properties
interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  icon?: string;
  tools?: any[];
}
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const skeletons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function CategoryContent({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [category, setCategory] = useState({} as CategoryType);
  const [tools, setTools] = useState<any[]>([]); // Liste des outils
  const [page, setPage] = useState<number>(1); // Numéro de page pour la pagination
  const [loading, setLoading] = useState<boolean>(false); // Chargement
  const [hasMore, setHasMore] = useState<boolean>(true); // S'il y a plus de données
  const observer = useRef<IntersectionObserver | null>(null);
  const lastToolElementRef = useRef<HTMLDivElement | null>(null);
  
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  // Fonction pour récupérer les outils d'une catégorie
  async function getToolsByCategory() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/api/category/${categoryId}?page=${page}&number=12`
      );

      if (data.category) {
        setCategory(data.category);
      }

      // Check if tools exist in the response and handle different possible structures
      const toolsData = data.tools || data.category?.tools || [];
      
      if (Array.isArray(toolsData)) {
        if (toolsData.length === 0) {
          setHasMore(false);
        } else {
          // Add the new tools to the existing list
          setTools((prevTools) => [...prevTools, ...toolsData]);
        }
      } else {
        console.error('Tools data is not in expected format:', toolsData);
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
      router.push("/categories");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }

  // Récupérer les outils au chargement initial
  useEffect(() => {
    getToolsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Configurer l'observateur d'intersection pour l'infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastToolElementRef.current) {
      observer.current.observe(lastToolElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, tools]);

  // Charger plus d'outils quand la page change
  useEffect(() => {
    if (page > 1) {
      getToolsByCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="container mx-auto py-8 px-4">
      {initialLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12 mt-12">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-violet-500 shadow-lg">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name || "Category"}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to placeholder on error
                    const target = e.target as HTMLImageElement;
                    target.src = "/logo.png";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-violet-100 text-5xl">
                  {/* <Image
                    src="/logo.png"
                    alt="Category placeholder"
                    width={50}
                    height={50}
                    className="object-contain"
                  /> */}
                  {category.icon}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-violet-700">
                {category.name}
              </h1>
              <p className="text-gray-600 max-w-2xl">
                {category.description || `Découvrez les meilleurs outils de ${category.name}`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              // Handle both possible data structures: direct tool object or {tool: {...}} format
              const toolData = tool.tool ? tool.tool : tool;
              
              if (tools.length === index + 1) {
                return (
                  <div ref={lastToolElementRef} key={toolData.id || index}>
                    <ToolsCard tool={toolData} />
                  </div>
                );
              } else {
                return <ToolsCard key={toolData.id || index} tool={toolData} />;
              }
            })}

            {loading &&
              skeletons.map((skeleton) => (
                <SkeletonCard key={skeleton} />
              ))}
          </div>

          {!loading && tools.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">
                Aucun outil trouvé dans cette catégorie
              </h2>
              <p className="text-gray-600">
                Nous travaillons à ajouter plus d&apos;outils. Revenez bientôt !
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// function Loader() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh]">
//       <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-500 rounded-full animate-spin"></div>
//       <p className="mt-4 text-gray-600">Chargement...</p>
//     </div>
//   );
// }
