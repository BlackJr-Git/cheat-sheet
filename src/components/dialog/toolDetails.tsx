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

            <div className="flex gap-2 w-full">
              <Button className="w-full text-lg grow">
                <a
                  href={tool.url}
                  target="_blank"
                  className="w-full text-lg grow flex gap-4 items-center justify-center"
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
