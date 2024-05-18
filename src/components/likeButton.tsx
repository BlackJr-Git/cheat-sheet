"use client";
import { Button } from "./ui/button";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function LikeButton({ likes }: { likes: number }) {
  const [like, setLike] = useState(likes);
  const [isliked, setIsLiked] = useState(false);

  function likeTool() {
    if (isliked) {
      setLike(like - 1);
      setIsLiked(false);
    } else {
      setLike(like + 1);
      setIsLiked(true);
    }
  }

  return (
    <Button variant="outline" className="flex gap-2" onClick={likeTool}>
      {" "}
      <HeartIcon
        className={`h-6 w-6 ${isliked ? "text-red-500 fill-red-500" : ""} `}
      />{" "}
      {like}{" "}
    </Button>
  );
}

export default LikeButton;
