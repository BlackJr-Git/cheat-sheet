"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";

const activeTool = {
  id: 1,
  title: "Coolify",
  image:
    "https://res.cloudinary.com/devhqdrwl/image/upload/v1727946577/cheat-sheet/Screenshot_2024-10-03_100919_gper6c.png",
  description:
    "Plateforme open-source de déploiement pour applications, offrant une alternative à Heroku, Netlify, et Vercel. Prend en charge de multiples langages, serveurs et cas d'utilisation, avec intégrations Git, SSL gratuit et automatisation.",
  url: "https://coolify.io/",
  published: true,
  category: [
    {
      id: 1,
      name: "Dev",
    },
    {
      id: 2,
      name: "UX",
    },
    {
      id: 3,
      name: "Photos",
    },
    {
      id: 4,
      name: "AI",
    },
  ],
};

export default function UpdateToolsDialog({ tool }: { tool: any }) {
  tool = activeTool;
  return (
    <Dialog>
      <DialogTrigger className="rounded-full p-2 hover:bg-violet-200 cursor-pointer bg-violet-400 w-full">Modifier</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tool.title}</DialogTitle>
          <DialogDescription >
            <div className="flex justify-center items-center flex-col p-4 gap-4 w-full bg-white rounded-xl overflow-y-scroll scrollbar-hide">
              <div>
                <Image
                  priority
                  className="rounded-lg"
                  src={tool.image}
                  alt="logo"
                  width={500}
                  height={400}
                />
              </div>
              <Input placeholder="" value={tool.title} />
              <Input placeholder="" value={tool.url} />
              <Textarea placeholder="" value={tool.description} />
              <div className="flex flex-col w-full gap-2">
                <p>Catégorie</p>

                <div className="flex flex-wrap gap-2">
                  {tool.category.map((category: any) => (
                    <div
                      key={category.id}
                      className="bg-green-500 rounded-full py-1 px-2 flex items-center justify-center gap-3"
                    >
                      <p className="text-white">{category.name}</p>{" "}
                      <button className="text-red-500 font-bold">X</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 w-full">
                Publié <Switch value={"on"} />
              </div>
              <Button className="w-full">Enregistrer</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
