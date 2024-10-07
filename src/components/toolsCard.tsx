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

function ToolsCard({ tool }: { tool: ToolType }) {
  return (
    <Card className="max-w-72">
      <CardHeader>
        <CardDescription>
          <Image
            priority
            className="rounded-lg"
            src={tool.image}
            alt={tool.title + " image"}
            width={300}
            height={300}
          />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle className="truncate">{tool.title}</CardTitle>
        <span className="line-clamp-2">{tool.description}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <ToolDetails tool={tool} />
        <LikeButton likes={tool.userLikes?.length || 0} />
      </CardFooter>
    </Card>
  );
}

export default ToolsCard;
