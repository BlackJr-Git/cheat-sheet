"use client";
import { SkeletonCard, ToolsCard } from "@/components";
import { CategoryType, getToolsType } from "@/types";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTools } from "@/hooks";

const skeletons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function ToolsPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;
  const { toast } = useToast();
  const [page, setPage] = useState<number>(1); // Numéro de page pour la pagination
  const loader = useRef<HTMLDivElement>(null); // Référence pour l'observateur
  const isFirstLoad = useRef(true); // Ref pour indiquer si c'est le premier chargement
  const [allTools, setAllTools] = useState<any[]>([]); // Accumulate all tools

  // Use React Query to fetch tools with the correct parameters
  const { 
    data, 
    isLoading, 
    isError, 
    isFetching,
    isPlaceholderData
  } = useTools(page, 8, 'desc');

  // Determine if there are more pages to load
  const hasMore = data ? page < data.totalPages : false;
  
  // Handle errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  // Update allTools when new data arrives
  useEffect(() => {
    if (data?.tools) {
      if (page === 1) {
        // Replace all tools on first page
        setAllTools(data.tools);
      } else {
        // Append tools for subsequent pages, ensuring no duplicates
        setAllTools(prev => {
          // Get existing tool IDs for deduplication
          const existingIds = new Set(prev.map(tool => tool.id));
          
          // Filter out any tools that already exist in our list
          const newTools = data.tools.filter(tool => !existingIds.has(tool.id));
          
          return [...prev, ...newTools];
        });
      }
      
      // After first load, mark as not first load anymore
      isFirstLoad.current = false;
    }
  }, [data, page]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const loaderElement = loader.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isFetching &&
          !isPlaceholderData && // Only fetch next page when current data is fresh
          !isFirstLoad.current
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 } // Lower threshold to trigger earlier
    );

    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };
  }, [hasMore, isFetching, isPlaceholderData]);

  return (
    <main className="container my-4">
      <section className="relative mt-24">
        <div className="p-12 bg-green-500/30 border-2 border-green-400 flex justify-center items-center flex-col gap-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-semibold">
            {/* {category?.icon} {category?.name} */}
            Ressources
          </h1>
          <p className="text-lg">
            <span className="text-white bg-violet-500 p-2">
              {data?.totalTools || 0} outils
            </span>{" "}
            disponibles. Trouvez ce dont vous avez besoin.
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

      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {allTools?.map((tool: any) => (
            <ToolsCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Loader pour déclencher le scroll infini */}
        {(isLoading || isFetching) && (
          <div className="flex items-center justify-center flex-wrap gap-6 mt-8">
            {skeletons?.map((tool: number) => (
              <SkeletonCard key={tool} />
            ))}
          </div>
        )}
        <div ref={loader} className="h-1 w-full" />
      </section>
    </main>
  );
}

export default ToolsPage;
