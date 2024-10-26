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
const skeletons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bookmarkedTools =
      (user?.unsafeMetadata as UserMetadata)?.bookmarks || [];
    async function getBookmarks(): Promise<any> {
      try {
        setLoading(true);
        const bookmarks = await getBookmarksAction(bookmarkedTools);
        setBookmarks(bookmarks);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBookmarks();
  });

  return (
    <main className="container my-4 min-h-screen">
      <section className="relative mt-24">
        <div className="p-12 bg-green-500/30 border-2 border-green-400 flex justify-center items-center flex-col gap-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-semibold">Mes ressources favorites</h1>
          <p className="text-lg">
            <span className="text-white bg-violet-500 p-2">
              {bookmarks?.length} ressources
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
          {bookmarks?.map((tool: any) => (
            <ToolsCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Loader pour déclencher le scroll infini */}
        {/* {loading && (
          <div className="flex items-center justify-center flex-wrap gap-6 mt-8">
            {skeletons.map((tool: number) => (
              <SkeletonCard key={tool} />
            ))}
          </div>
        )} */}
        {/* <div ref={loader} className="h-5 w-full" /> */}
      </section>
    </main>
  );
}
