"use client";
import { Button } from "./ui/button";
// import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Bookmark } from "lucide-react";

function BookmarkButton({ bookmarks }: { bookmarks: number }) {
  const [bookmark, setbookmark] = useState(bookmarks);
  const [isbookmarked, setIsbookmarked] = useState(false);

  function bookmarkTool() {
    if (isbookmarked) {
      // setbookmark(bookmark - 1);
      setIsbookmarked(false);
    } else {
      // setbookmark(bookmark + 1);
      setIsbookmarked(true);
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
