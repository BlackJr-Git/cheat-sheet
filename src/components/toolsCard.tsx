"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ToolType } from "@/types";
import { LikeButton, ToolDetails } from ".";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ToolsCard({ tool }: { tool: ToolType }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-0">
        <div className="relative w-full aspect-video flex items-center justify-center">
          {imageLoading && !imageError && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-lg m-0" />
          )}
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="App Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <p className="text-sm text-gray-500 truncate max-w-full px-2">{tool.title}</p>
              </div>
            </div>
          ) : (
            <Image
              priority
              className="rounded-lg object-cover h-full w-full"
              src={tool.image}
              alt={tool.title + " image"}
              width={300}
              height={169}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
              style={{ opacity: imageLoading ? 0 : 1, transition: "opacity 0.2s" }}
            />
          )}
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle className="truncate">{tool.title}</CardTitle>
        <span className="line-clamp-2">{tool.description}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <ToolDetails tool={tool} />
        <LikeButton likes={tool.userLikes?.length || 0} id={tool.id} />
      </CardFooter>
    </Card>
  );
}

export default ToolsCard;
