import axios from "axios";
import { ToolType, getToolsType } from "@/types";
import { HeroSection, Categories, ToolsCard } from "@/components";

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
    <main className="container py-12">
      <HeroSection />
      <Categories />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
        <ToolsCard key={tool.id} tool={tool} />
      ))}
      </div>
    </main>
  );
}
