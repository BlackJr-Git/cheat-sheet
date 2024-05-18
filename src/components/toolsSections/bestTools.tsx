import axios from "axios";
import { ToolType, getToolsType } from "@/types";
import ToolsCard from "../toolsCard";

async function BestTools() {
  async function getTools(): Promise<ToolType[]> {
    try {
      const { data }: { data: getToolsType } = await axios.get(
        "http://localhost:3000/api/tools?number=25&pages=1"
      );
      return data.tools;
    } catch (error) {
      return [];
    }
  }

  const tools: ToolType[] = await getTools();
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Les meilleurs outils</h2>
      <div className="flex items-center flex-wrap gap-6 justify-center ">
        {tools.map((tool) => (
          <ToolsCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default BestTools;