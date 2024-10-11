"use client";
import { ToolsCard } from "@/components";
import { CategoryType, getToolsType } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Page({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;
  const { toast } = useToast();
  const [category, setCategory] = useState({} as CategoryType);
  const [tools, setTools] = useState<any[]>([]); // Liste des outils
  const [page, setPage] = useState<number>(1); // Numéro de page pour la pagination
  const [loading, setLoading] = useState<boolean>(false); // Chargement
  const [hasMore, setHasMore] = useState<boolean>(true); // Indicateur s'il reste des données à charger
  const loader = useRef<HTMLDivElement>(null); // Référence pour l'observateur
  const isFirstLoad = useRef(true); // Ref pour indiquer si c'est le premier chargement

  const [data, setData] = useState({} as getToolsType);

  // Récupérer les données d'une page
  const getCategory = async (pageNum: number, replace = false) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/api/tools/?pages=${pageNum}&number=8&orderby=desc`
      );

      setCategory(data.category);

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
    // On remplace les outils existants pour la première page
    getCategory(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Intersection Observer pour charger plus d'outils lorsque le bas de page est atteint
  useEffect(() => {
    const loaderElement = loader.current; // Copier la référence du loader actuel

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !isFirstLoad.current
        ) {
          setPage((prevPage) => prevPage + 1); // Incrémenter la page
        }
      },
      { threshold: 1.0 } // Déclenche quand on atteint le bas de page
    );

    if (loaderElement) {
      observer.observe(loaderElement); // Observer l'élément
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement); // Désactiver l'observation
      }
    };
  }, [hasMore, loading]);

  // Charger les outils supplémentaires lorsque la page change
  useEffect(() => {
    if (page > 1) {
      getCategory(page);
    } else {
      isFirstLoad.current = false; // Après la première page, désactiver le premier chargement
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
              {data?.totalTools} outils
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
        <div className="flex items-center justify-center flex-wrap gap-6">
          {tools.map((tool: any) => (
            <ToolsCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Loader pour déclencher le scroll infini */}
        {loading && <Loader />}
        <div ref={loader} className="h-5 w-full" />
      </section>
    </main>
  );
}

export default Page;

function Loader() {
  return (
    <div className="inset-0 bg-white flex items-center justify-center z-50 mt-12">
      <div className="loader border-8 border-gray-200 border-t-8 border-t-violet-500 rounded-full w-16 h-16 animate-spin">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-lg font-semibold ml-4">Chargement</p>
    </div>
  );
}