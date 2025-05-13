import { Metadata, ResolvingMetadata } from "next";
import ToolContent from "./toolContent";

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

/**
 * SingleToolPage is a server component that renders the ToolContent client component.
 * 
 * Props:
 * - params: An object containing the tool ID which is passed to the client component.
 */
export default function SingleToolPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  return <ToolContent id={id} />;
}
