import axios from "axios";
import { ToolType, getToolsType } from "@/types";
import ToolsCard from "../toolsCard";

async function MostRecentTools() {
  async function getTools(): Promise<ToolType[]> {
    try {
      const { data }: { data: getToolsType } = await axios.get(
        "https://cheat-sheet-plum.vercel.app/api/tools?number=8&pages=1&orderby=desc"
      );
      return data.tools;
    } catch (error) {
      return [];
    }
  }

  const tools: ToolType[] = (await getTools()) || [];
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Les plus récents</h2>
      <div className="flex items-center flex-wrap gap-6 justify-center ">
        {tools.map((tool) => (
          <ToolsCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default MostRecentTools;
