"use client";

import { BookmarkButton, LikeButton, Loader } from "@/components";
import { Button } from "@/components/ui/button";
import { Eye, Share } from "lucide-react";
import Image from "next/image";
import SharePopover from "@/components/dialog/sharePopover";
import { useTool } from "@/hooks/useTools";
import { useState } from "react";

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
 * ToolContent is a client component that displays detailed information about a specific tool.
 */
export default function ToolContent({ id }: { id: string }) {
  // Use React Query to fetch the tool data
  const { data: toolData, isLoading, isError } = useTool(id);
  
  // Image loading and error states
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Format the tool data if available
  const tool = toolData ? {
    ...toolData,
    categories: toolData.categories?.map((item: any) => {
      // Handle the nested category structure
      if (item.category) {
        return {
          id: item.category.id,
          name: item.category.name,
          icon: item.category.icon,
        };
      } else if (item.categoryId) {
        // Handle the case where only categoryId is available
        return {
          id: item.categoryId,
          name: item.name || 'Category',
          icon: item.icon || '🔍',
        };
      } else {
        // Fallback for any other structure
        return {
          id: item.id || 0,
          name: item.name || 'Category',
          icon: item.icon || '🔍',
        };
      }
    })
  } : null;
  
  // For debugging
  console.log('Tool data:', toolData);
  
  // Handle error state
  if (isError) {
    console.error("Error fetching tool data");
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Failed to load tool data. Please try again later.</p>
      </div>
    );
  }

  if (isLoading || !tool) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <main className="container py-12 min-h-[80vh]">
      {/* Hero Section with Tool Title */}
      <section className="relative mb-12">
        <div className="p-8 md:p-12 bg-gradient-to-r from-violet-500/20 to-green-500/20 border-2 border-violet-300 flex justify-center items-center flex-col gap-4 rounded-xl backdrop-blur-sm shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-center">{tool.title}</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            {tool.categories?.map((category) => (
              <span
                key={`${category.id}__category`}
                className="text-sm md:text-base font-medium flex items-center gap-2 border border-violet-300 bg-violet-100 rounded-full px-3 py-1 shadow-sm"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </span>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <Image
          src="/cheat-sheet-arrow-green.png"
          alt="decorative element"
          width={120}
          height={120}
          className="absolute -bottom-8 left-4 md:left-8 z-10 hidden md:block"
        />
        <Image
          src="/cheat-sheet-arrow-violet.png"
          alt="decorative element"
          width={120}
          height={120}
          className="absolute -bottom-8 right-4 md:right-8 z-10 hidden md:block"
        />
      </section>
      
      {/* Main Content */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-16">
        {/* Left Column - Image */}
        <div className="md:col-span-2 h-full">
          <div className="sticky top-24 overflow-hidden rounded-xl border-2 border-gray-200 shadow-xl bg-white p-2">
            {/* Image with loading state and error handling */}
            <div className="relative aspect-video md:aspect-square w-full overflow-hidden rounded-lg">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                </div>
              )}
              <Image
                src={imageError ? "/logo.png" : tool.image}
                alt={tool.title}
                fill
                className={`${imageError ? "object-contain p-8" : "object-cover"} ${
                  imageLoading ? "opacity-0" : "opacity-100"
                } hover:scale-105 transition-transform duration-500`}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Right Column - Details */}
        <div className="md:col-span-3 space-y-8">
          {/* Description */}
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => window.open(tool.url, '_blank')}
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-6"
            >
              <Eye className="mr-2 h-5 w-5" />
              Visit Website
            </Button>
            
            <div className="flex gap-2">
              <BookmarkButton toolId={tool.id} />
              <LikeButton id={tool.id} likes={0} />
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12"
                onClick={() => {
                  // Use the SharePopover functionality directly
                  const url = `/tools/${tool.slug}`;
                  navigator.clipboard.writeText(window.location.origin + url);
                  // You might want to add a toast notification here
                }}
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Related tools section could go here */}
        </div>
      </section>
    </main>
  );
}
