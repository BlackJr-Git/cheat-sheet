"use client";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface UserMetadata {
  bookmarks?: number[]; // Définir `bookmarks` comme un tableau de nombres
}
function BookmarkButton({ toolId }: { toolId: number }) {
  // const [bookmark, setbookmark] = useState(bookmarks);
  const [isbookmarked, setIsbookmarked] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const bookmarkedTools =
      (user?.unsafeMetadata as UserMetadata)?.bookmarks || [];

    if (user) {
      if (bookmarkedTools?.includes(toolId)) {
        setIsbookmarked(true);
      } else {
        setIsbookmarked(false);
      }
    }
  }, [user, toolId]);

  function bookmarkTool() {
    if (isbookmarked) {
      // setbookmark(bookmark - 1);
      setIsbookmarked(false);
      user?.update({
        unsafeMetadata: {
          bookmarks: (user.unsafeMetadata?.bookmarks as number[]).filter(
            (toolId) => toolId !== toolId
          ),
        },
      });
    } else {
      // setbookmark(bookmark + 1);
      setIsbookmarked(true);
      user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bookmarks: [
            ...((user.unsafeMetadata?.bookmarks as number[]) || []),
            toolId,
          ],
        },
      });
    }
  }

  return (
    <Button
      variant="outline"
      className="flex gap-2 cursor-pointer border-2 border-violet-500 hover:bg-violet-200"
      onClick={bookmarkTool}
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
  );
}

export default BookmarkButton;
