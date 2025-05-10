"use client"
import Image from "next/image";
import { BookmarkButton, LikeButton } from "..";
import { Button } from "../ui/button";
import { Eye, Sparkles } from "lucide-react";
import SharePopover from "../dialog/sharePopover";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const tool = {
  id: 98,
  title: "V0.dev",
  image:
    "https://res.cloudinary.com/devhqdrwl/image/upload/v1727770249/cheat-sheet/Screenshot_2024-10-01_085640_ibnhgg.png",
  description:
    "Plateforme de développement no-code offrant des outils pour créer, tester et déployer des applications sans écrire de code, avec des intégrations pour plusieurs services.",
  url: "https://v0.dev/",
  published: true,
  userLikes: [],
  slug: "v0-dev",
};

export default function Highlight() {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="container py-16 md:py-24">
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent w-16 md:w-32"></div>
        <h2 className="text-3xl font-bold text-center flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-violet-500" />
          <span>La pépite du moment</span>
          <Sparkles className="h-6 w-6 text-violet-500" />
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent w-16 md:w-32"></div>
      </div>
      
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-500/10 to-green-500/10 border-2 border-violet-300 rounded-2xl p-6 md:p-8 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-300/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          {/* Image container with loading state */}
          <div className="md:w-2/5 lg:w-1/3 relative">
            <div className="relative aspect-video md:aspect-square w-full overflow-hidden rounded-xl border-2 border-white/50 shadow-lg">
              {imageLoading && !imageError && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
              )}
              
              <Image
                src={tool.image}
                alt={tool.title}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
              
              {/* Fallback for image error */}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                  <div className="flex flex-col items-center gap-2 p-4">
                    <Image
                      src="/logo.png"
                      alt="App Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                    <p className="text-sm text-gray-500 text-center">{tool.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content container */}
          <div className="md:w-3/5 lg:w-2/3 space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-violet-700">{tool.title}</h3>
              <p className="text-gray-700 leading-relaxed">{tool.description}</p>
            </div>
            
            <div className="pt-4">
              <div className="flex gap-3 flex-wrap">
                <Button className="shadow-md">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" /> Visiter le site
                  </a>
                </Button>
                <BookmarkButton toolId={tool.id} />
                <LikeButton likes={0} id={tool.id} />
                <SharePopover
                  title={tool.title}
                  url={`${process.env.NEXT_PUBLIC_API_URL}/tools/${tool.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
