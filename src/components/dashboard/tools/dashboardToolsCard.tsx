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
    <Card className="max-w-52">
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
        <CardTitle className="truncate">{tool.title}</CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <ToolDetails tool={tool} />
        <UpdateToolsDialog tool={tool} />
      </CardFooter>
    </Card>
  );
}
