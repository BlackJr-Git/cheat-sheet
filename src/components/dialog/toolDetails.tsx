"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToolType } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Share, Eye } from "lucide-react";
import { BookmarkButton } from "../";
import SharePopover from "./sharePopover";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ToolDetails({ tool }: { tool: ToolType }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <Dialog>
      <DialogTrigger className="rounded-lg p-2 hover:bg-slate-50 cursor-pointer">
        En savoir plus
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {tool.title}
          </DialogTitle>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-full max-w-[400px] aspect-video">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
                  <div className="z-10">
                    <Image
                      src={tool.image}
                      alt={tool.title + " image"}
                      width={100}
                      height={56}
                      className="opacity-70 object-contain"
                    />
                  </div>
                </div>
              )}
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src="/logo.png"
                      alt="App Logo"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                    <p className="text-sm text-gray-500">{tool.title}</p>
                  </div>
                </div>
              ) : (
                <Image
                  priority
                  className="rounded-lg object-contain w-full h-full"
                  src={tool.image}
                  alt={tool.title + " image"}
                  width={400}
                  height={225}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                  style={{ opacity: imageLoading ? 0 : 1, transition: "opacity 0.2s" }}
                />
              )}
            </div>

            <div>
              <p className="text-center text-xl">{tool.description}</p>
            </div>

            <div className="flex gap-2 w-full">
              <Button className="w-full grow">
                <a
                  href={tool.url}
                  target="_blank"
                  className="w-full grow flex gap-4 items-center justify-center"
                >
                  Visiter le site <Eye />
                </a>
              </Button>
              {/* <Button className="text-lg flex gap-2 bg-transparent hover:bg-green-200 border-green-300 text-green-500">
                <Share />
              </Button> */}
              <SharePopover
                title={tool.title}
                url={`${process.env.NEXT_PUBLIC_API_URL}/tools/${tool.slug}`}
              />
              {/* <Button className="text-lg flex gap-2">
                <Bookmark />
              </Button> */}
              <BookmarkButton toolId={tool.id} />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ToolDetails;
