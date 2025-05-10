// "use client";
import { Metadata, ResolvingMetadata } from "next";
import { BookmarkButton, LikeButton, Loader } from "@/components";
import { Button } from "@/components/ui/button";
import { Eye, Share } from "lucide-react";
import Image from "next/image";
// import { useState } from "react";
import SharePopover from "@/components/dialog/sharePopover";
// import { useRouter } from "next/navigation";
import { useTool } from "@/hooks";

// Generate dynamic metadata for each tool page
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch tool data for metadata
  let toolData;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/${params.id}`, { 
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) throw new Error('Failed to fetch tool data');
    toolData = await res.json();
  } catch (error) {
    console.error('Error fetching metadata for tool:', error);
    // Return default metadata if fetch fails
    return {
      title: 'Outil | The Cheat Sheet',
      description: 'Découvrez cet outil de productivité sur The Cheat Sheet',
    };
  }

  // Get parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${toolData.title} | The Cheat Sheet`,
    description: toolData.description || 'Découvrez cet outil de productivité sur The Cheat Sheet',
    alternates: {
      canonical: `/tools/${toolData.slug}`,
    },
    openGraph: {
      title: toolData.title,
      description: toolData.description,
      url: `${process.env.NEXT_PUBLIC_API_URL}/tools/${toolData.slug}`,
      type: 'article',
      images: [toolData.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: toolData.title,
      description: toolData.description,
      images: [toolData.image],
    },
  };
}

// Client component for the tool page content

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
  const { id } = params;
  // const router = useRouter();
  
  // Use React Query to fetch the tool data
  const { data: toolData, isLoading, isError } = useTool(id);
  
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
    // router.push("/tools");
    return null;
  }

  if (isLoading || !tool) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
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
              <Image
                src={tool.image}
                alt={tool.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback to logo if image fails to load
                  e.currentTarget.src = "/logo.png";
                  e.currentTarget.className = "object-contain p-8";
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Right Column - Details */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Description Card */}
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-violet-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          </div>
          
          {/* Actions Card */}
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
              Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button className="text-white shadow-md">
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
          
          {/* Related Tools Card - Placeholder for future enhancement */}
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Outils similaires
            </h2>
            <p className="text-gray-500 italic">Découvrez bientôt des outils similaires...</p>
          </div>
        </div>
      </section>
    </main>
  );
}
