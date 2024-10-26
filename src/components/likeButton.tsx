"use client";
import { Button } from "./ui/button";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface UserMetadata {
  likedTools?: number[]; // Définir `likedTools` comme un tableau de nombres
}

function LikeButton({ likes, id }: { likes: number; id: number }) {
  const [like, setLike] = useState(likes);
  const [isliked, setIsLiked] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const likedTools = (user?.unsafeMetadata as UserMetadata)?.likedTools || [];

    if (user) {
      if (likedTools?.includes(id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [user, id]);

  function likeTool() {
    if (isliked) {
      setLike(like - 1);
      setIsLiked(false);
      user?.update({
        unsafeMetadata: {
          likedTools: (user.unsafeMetadata?.likedTools as number[]).filter(
            (toolId) => toolId !== id
          ),
        },
      });
    } else {
      setLike(like + 1);
      setIsLiked(true);
      user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          likedTools: [
            ...((user.unsafeMetadata?.likedTools as number[]) || []),
            id,
          ],
        },
      });
    }
  }

  return (
    <Button
      variant="outline"
      className="flex gap-2 cursor-pointer hover:bg-red-200 border-2 hover:border-red-500 hover:text-red-500"
      onClick={likeTool}
    >
      {" "}
      <HeartIcon
        className={`h-6 w-6  ${isliked ? "text-red-500 fill-red-500" : ""} `}
      />{" "}
      {like}{" "}
    </Button>
  );
}

export default LikeButton;
