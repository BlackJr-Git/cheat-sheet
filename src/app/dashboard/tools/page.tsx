"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToolsCard } from "@/components";
import { ToolType, getToolsType } from "@/types";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DashboardToolsCard } from "@/components/dashboard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

export default function Page() {
  const [tools, setTools] = useState([] as ToolType[]);

  useEffect(() => {
    async function getTools(): Promise<ToolType[]> {
      try {
        const { data }: { data: getToolsType } = await axios.get(
          `${apiUrl}/api/tools?number=12&pages=1&orderby=desc`
        );
        setTools(data.tools);
        return data.tools;
      } catch (error) {
        return [];
      }
    }

    getTools();
  });

  return (
    <div className="w-full bg-slate-100 grow rounded-2xl p-4 max-h-[90%] flex gap-4">
      <div className="flex items-center flex-wrap gap-4 w-full justify-center overflow-y-scroll scrollbar-hide">
        {tools.map((tool) => (
          <DashboardToolsCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* <div className="flex justify-center items-center flex-col p-4 gap-4 w-[30%] bg-white rounded-xl overflow-y-scroll scrollbar-hide">
        <div>
          <Image
            priority
            className="rounded-lg"
            src={activeTool.image}
            alt="logo"
            width={500}
            height={400}
          />
        </div>
        <Input placeholder="" value={activeTool.title} />
        <Textarea placeholder="" value={activeTool.description} />
        <Input placeholder="" value={activeTool.url} />

        <div className="flex flex-col w-full">
          <p>Catégorie</p>

          <div className="flex flex-wrap gap-2">
            {activeTool.category.map((category) => (
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
      </div> */}
    </div>
  );
}
