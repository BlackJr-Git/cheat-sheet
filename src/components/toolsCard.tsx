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

type ToolType = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  published: boolean;
  categories: string[];
};

function ToolsCard({ tool }: { tool: ToolType }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <Image
            priority
            className="rounded-lg"
            src={tool.image}
            alt="logo"
            width={300}
            height={300}
          />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle>{tool.title}</CardTitle>
        <p className="line-clamp-2">{tool.description}</p>
      </CardContent>
      <CardFooter>
        <Button><a href={tool.url} target="_blank">Voir le site</a></Button>
      </CardFooter>
    </Card>
  );
}

export default ToolsCard;
