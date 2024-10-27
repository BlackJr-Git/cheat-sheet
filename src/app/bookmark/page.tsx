"use client";
import { ToolsCard, SkeletonCard } from "@/components";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getBookmarksAction } from "@/actions/bookmarkActions";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

interface UserMetadata {
  bookmarks?: number[]; // Définir `bookmarks` comme un tableau de nombres
}

const skeletons: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const { toast } = useToast();
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bookmarkedTools = (user?.unsafeMetadata as UserMetadata)?.bookmarks || [];

    async function getBookmarks() {
      try {
        setLoading(true);
        const fetchedBookmarks = await getBookmarksAction(bookmarkedTools);
        setBookmarks(fetchedBookmarks as any);
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger vos favoris.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (bookmarkedTools.length) {
      getBookmarks();
    }
  }, [user, toast]);

  return (
    <main className="container my-4 min-h-screen">
      <section className="relative mt-24">
        <div className="p-12 bg-green-500/30 border-2 border-green-400 flex justify-center items-center flex-col gap-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-semibold">Mes ressources favorites</h1>
          <p className="text-lg">
            <span className="text-white bg-violet-500 p-2">
              {bookmarks.length} ressources
            </span>{" "}
            disponibles dans vos favoris.
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
          {loading
            ? skeletons.map((_, index) => <SkeletonCard key={index} />)
            : bookmarks.map((tool: any) => <ToolsCard key={tool.id} tool={tool} />)}
        </div>

        {/* Loader pour déclencher le scroll infini */}
        <div ref={loader} className="h-5 w-full" />
      </section>
    </main>
  );
}