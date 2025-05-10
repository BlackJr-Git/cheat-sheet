"use client";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useBookmarkTool, useRemoveBookmark } from "@/hooks";
import AuthModal from "./dialog/authModal";

interface UserMetadata {
  bookmarks?: number[]; // Définir `bookmarks` comme un tableau de nombres
}
function BookmarkButton({ toolId }: { toolId: number }): JSX.Element {
  // const [bookmark, setbookmark] = useState(bookmarks);
  const [isbookmarked, setIsbookmarked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    // Only check bookmarks if user is loaded and exists
    if (isLoaded) {
      const bookmarkedTools =
        (user?.unsafeMetadata as UserMetadata)?.bookmarks || [];

      if (user) {
        if (bookmarkedTools?.includes(toolId)) {
          setIsbookmarked(true);
        } else {
          setIsbookmarked(false);
        }
      }
    }
  }, [user, toolId, isLoaded]);

  // Use React Query mutations for bookmarking/unbookmarking tools
  const bookmarkMutation = useBookmarkTool();
  const removeBookmarkMutation = useRemoveBookmark();

  function handleBookmarkToggle() {
    // Check if user is authenticated
    if (!user && isLoaded) {
      // Show auth modal if not logged in
      setShowAuthModal(true);
      return;
    }
    
    if (isbookmarked) {
      // Remove bookmark
      setIsbookmarked(false);
      
      // Update user metadata
      user?.update({
        unsafeMetadata: {
          bookmarks: (user.unsafeMetadata?.bookmarks as number[]).filter(
            (id) => id !== toolId 
          ),
        },
      });
      
      // Call the API using React Query mutation
      removeBookmarkMutation.mutate(toolId, {
        onSuccess: () => {
          toast({
            title: "Ressource supprimée",
            description: "Ressource supprimée de vos favoris avec succès",
          });
        }
      });
    } else {
      // Add bookmark
      setIsbookmarked(true);
      
      // Update user metadata
      user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bookmarks: [
            ...((user.unsafeMetadata?.bookmarks as number[]) || []),
            toolId,
          ],
        },
      });
      
      // Call the API using React Query mutation
      bookmarkMutation.mutate(toolId, {
        onSuccess: () => {
          toast({
            title: "Ressource ajoutée",
            description: "Ressource ajoutée à vos favoris avec succès",
          });
        }
      });
    }
  }
  
  // Close the auth modal
  const closeAuthModal = () => {
    setShowAuthModal(false);
  }

  return (
    <>
      <Button
        variant="outline"
        className="flex gap-2 cursor-pointer border-2 border-violet-500 hover:bg-violet-200"
        onClick={handleBookmarkToggle}
        disabled={bookmarkMutation.isPending || removeBookmarkMutation.isPending}
      >
        {" "}
        <Bookmark
          color="#8b5cf6"
          className={`h-6 w-6 ${
            isbookmarked ? "text-violet-500 fill-violet-500" : ""
          } `}
          fill={isbookmarked ? "violet" : "none"}
        />{" "}
      </Button>
      
      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />
    </>
  );
}

export default BookmarkButton;
