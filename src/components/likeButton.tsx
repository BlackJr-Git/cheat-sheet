"use client";
import { Button } from "./ui/button";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useLikeTool, useUnlikeTool } from "@/hooks";
import AuthModal from "./dialog/authModal";

interface UserMetadata {
  likedTools?: number[]; // Définir `likedTools` comme un tableau de nombres
}

function LikeButton({ likes, id }: { likes: number; id: number }) {
  const [like, setLike] = useState(likes);
  const [isliked, setIsLiked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Only check likes if user is loaded and exists
    if (isLoaded) {
      const likedTools = (user?.unsafeMetadata as UserMetadata)?.likedTools || [];

      if (user) {
        if (likedTools?.includes(id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    }
  }, [user, id, isLoaded]);

  // Use React Query mutations for liking/unliking tools
  const likeMutation = useLikeTool();
  const unlikeMutation = useUnlikeTool();

  function handleLikeToggle() {
    // Check if user is authenticated
    if (!user && isLoaded) {
      // Show auth modal if not logged in
      setShowAuthModal(true);
      return;
    }
    
    if (isliked) {
      // Unlike the tool
      setLike(like - 1);
      setIsLiked(false);
      
      // Update user metadata
      user?.update({
        unsafeMetadata: {
          likedTools: (user.unsafeMetadata?.likedTools as number[]).filter(
            (toolId) => toolId !== id
          ),
        },
      });
      
      // Call the API using React Query mutation
      unlikeMutation.mutate(id);
    } else {
      // Like the tool
      setLike(like + 1);
      setIsLiked(true);
      
      // Update user metadata
      user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          likedTools: [
            ...((user.unsafeMetadata?.likedTools as number[]) || []),
            id,
          ],
        },
      });
      
      // Call the API using React Query mutation
      likeMutation.mutate(id);
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
        className={`flex gap-2 ${isliked ? "border-red-500 text-red-500" : ""} cursor-pointer hover:bg-red-200 border-2 hover:border-red-500 hover:text-red-500`}
        onClick={handleLikeToggle}
        disabled={likeMutation.isPending || unlikeMutation.isPending}
      >
        {" "}
        <HeartIcon
          className={`h-6 w-6  ${isliked ? "text-red-500 fill-red-500" : ""} `}
        />{" "}
        {/* {like}{" "} */}
      </Button>
      
      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />
    </>
  );
}

export default LikeButton;
