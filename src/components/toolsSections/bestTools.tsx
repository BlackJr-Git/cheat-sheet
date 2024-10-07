import axios from "axios";
import { ToolType, getToolsType } from "@/types";
import ToolsCard from "../toolsCard";
import { ArrowLeftLotie } from "../index";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function BestTools() {
  async function getTools(): Promise<ToolType[]> {
    try {
      const { data }: { data: getToolsType } = await axios.get(
        `${apiUrl}/api/tools?number=4&pages=1`
      );
      return data.tools;
    } catch (error) {
      return [];
    }
  }

  const tools: ToolType[] = (await getTools()) || [];
  return (
    <section className="py-24 container ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold mb-8">Les meilleurs outils</h2>
        <Link href={"/tools"} className="flex items-center gap-2 font-semibold text-violet-500">
          Voir Plus<ArrowLeftLotie />
        </Link>
      </div>
      <div className="flex items-center flex-wrap gap-6 justify-center ">
        {tools.map((tool) => (
          <ToolsCard key={`${tool.id}__best_tools`} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default BestTools;
