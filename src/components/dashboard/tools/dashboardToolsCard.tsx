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
import ToolDetails from "@/components/dialog/toolDetails";
import UpdateToolsDialog from "./updateTools";
//   import { LikeButton, ToolDetails } from ".";

export default function DashboardToolsCard({ tool }: { tool: ToolType }) {
  return (
    <Card className="flex items-center justify-between w-[48%]">
      <div className="flex items-center justify-center">
      <CardHeader>
        <CardDescription>
          <Image
            priority
            className="rounded-lg"
            src={tool.image}
            alt={tool.title}
            width={200}
            height={200}
          />
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-start justify-center flex-col gap-2">
        <CardTitle className="truncate px-2 w-52">{tool.title}</CardTitle>
        <ToolDetails tool={tool} />
      </CardContent>
      </div>
      
      <CardFooter className="flex items-center justify-center gap-8">
        
        <UpdateToolsDialog tool={tool} />
      </CardFooter>
    </Card>
  );
}
