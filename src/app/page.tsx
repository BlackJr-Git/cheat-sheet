import { ToolsCard } from "@/components";
import axios from "axios";

type ToolType = {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
};

type getToolsType = {
  tools: ToolType[];
  totalTools: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};

export default async function Home() {
  async function getTools(): Promise<ToolType[]> {
    try {
      const { data }: { data: getToolsType } = await axios.get(
        "http://localhost:3000/api/tools?number=4&pages=1"
      );
      return data.tools;
    } catch (error) {
      return [];
    }
  }

  const tools: ToolType[] = await getTools();

  return (
    <main className="container py-12 flex items-center gap-6 flex-wrap">
      {tools.map((tool) => (
        <ToolsCard key={tool.id} tool={tool} />
      ))}
    </main>
  );
}
