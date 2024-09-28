import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { ToolType } from "@/types";
// import LikeButton from "./likeButton";
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
            alt={tool.title}
            width={300}
            height={300}
          />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle>{tool.title}</CardTitle>
        <span className="line-clamp-2">{tool.description}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button>
          <a href={tool.url} target="_blank">
            Voir le site
          </a>
        </Button> */}
        <ToolDetails tool={tool} />
        {/* <LikeButton likes={tool.userLikes.length} /> */}
      </CardFooter>
    </Card>
  );
}

export default ToolsCard;
