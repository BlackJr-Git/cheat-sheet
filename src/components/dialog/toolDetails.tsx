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
      <DialogTrigger className="bg-slate-100 border border-slate-200 rounded-lg p-2 hover:bg-slate-50">
        En savoir plus
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tool.title}</DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center gap-6">
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
              <p>{tool.description}</p>
            </div>
            <Button>
              <a href={tool.url} target="_blank">
                Voir le site
              </a>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ToolDetails;
