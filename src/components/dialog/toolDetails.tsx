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

function ToolDetails({ tool }: { tool: ToolType }) {
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
            <div>
              <Image
                priority
                className="rounded-lg"
                src={tool.image}
                alt="logo"
                width={400}
                height={400}
              />
            </div>
            <div>
              <p className="text-center text-xl">{tool.description}</p>
            </div>
            <Button className="w-full text-lg">
              <a href={tool.url} target="_blank">
                Voir le site
              </a>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ToolDetails;
