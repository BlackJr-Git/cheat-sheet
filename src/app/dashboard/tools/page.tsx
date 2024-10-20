"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToolType, getToolsType } from "@/types";
import { DashboardToolsCard } from "@/components/dashboard";
import { useToast } from "@/hooks/use-toast";
import { SkeletonCard } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const skeletons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function DashboardToolsPage() {
  const [tools, setTools] = useState([] as ToolType[]);
  const { toast } = useToast();
  const [data, setData] = useState({} as getToolsType);
  const [page, setPage] = useState<number>(1); // Numéro de page pour la pagination
  const [loading, setLoading] = useState<boolean>(false); // Indicateur de chargement
  const [hasMore, setHasMore] = useState<boolean>(true); // Indicateur s'il reste des données à charger
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Référence pour le conteneur avec scroll

  const getTools = async (pageNum: number, replace = false) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/tools/?pages=${pageNum}&number=12&orderby=desc`
      );

      // Ajouter les nouveaux outils à la liste existante sans les remplacer,
      // sauf si on utilise replace (pour le premier chargement)
      setTools((prevTools) =>
        replace ? data.tools : [...prevTools, ...data.tools]
      );
      setData(data);
      // Vérifier si on a atteint la dernière page
      if (pageNum >= data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Charger la première page dès le chargement du composant
  useEffect(() => {
    getTools(1, true); // Charger la première page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fonction de gestion du scroll pour charger plus de données
  const handleScroll = () => {
    const container = scrollContainerRef.current;

    if (container) {
      // Vérifier si l'utilisateur a atteint le bas du conteneur
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight && // Position du bas atteinte
        hasMore && // Il y a encore des données à charger
        !loading // Aucun chargement en cours
      ) {
        setPage((prevPage) => prevPage + 1); // Incrémenter la page
      }
    }
  };

  // Attacher l'événement de scroll sur le conteneur avec défilement
  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll); // Nettoyage
      }
    };
  }, [hasMore, loading /* eslint-disable-line react-hooks/exhaustive-deps */]);

  // Charger les outils supplémentaires lorsque la page change
  useEffect(() => {
    if (page > 1) {
      getTools(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full bg-slate-100 grow rounded-2xl p-4 max-h-[88%] flex flex-col gap-4 overflow-y-auto" // Conteneur avec scroll interne
    >
      <div className="flex items-center flex-wrap gap-4 w-full justify-center">
        {tools?.map((tool) => (
          <DashboardToolsCard key={tool.id} tool={tool} />
        ))}
        {loading && (
        <div className="flex items-center justify-center flex-wrap gap-6 mt-8">
          {skeletons.map((skeleton: number) => (
            <SkeletonDashboardCard key={skeleton} />
          ))}
        </div>
      )}
      </div>
      {/* {!hasMore && <div className="text-center w-full mt-4">No more data</div>} */}
    </div>
  );
}


export function SkeletonDashboardCard() {
  return (
    <div className="w-[48%] flex gap-2 items-center justify-center">
      <Skeleton className="h-24 w-72 rounded-xl bg-slate-300" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64 bg-slate-300" />
        <Skeleton className="h-8 w-56 bg-slate-300" />
      </div>
      <div>
      <Skeleton className="h-12 w-12 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}