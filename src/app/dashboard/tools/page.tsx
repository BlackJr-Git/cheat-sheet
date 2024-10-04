"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToolType, getToolsType } from "@/types";
import { DashboardToolsCard } from "@/components/dashboard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [tools, setTools] = useState([] as ToolType[]);

  useEffect(() => {
    async function getTools(): Promise<ToolType[]> {
      try {
        const { data }: { data: getToolsType } = await axios.get(
          `${apiUrl}/api/tools?number=16&pages=3&orderby=asc`
        );
        setTools(data.tools);
        console.log();
        
        return data.tools;
      } catch (error) {
        console.error("Error fetching tools:", error);
        return [];
      }
    }

    getTools();
  }, []);

  return (
    <div className="w-full bg-slate-100 grow rounded-2xl p-4 max-h-[90%] flex gap-4">
      <div className="flex items-center flex-wrap gap-4 w-full justify-center overflow-y-scroll scrollbar-hide">
        {tools?.map((tool) => (
          <DashboardToolsCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
