import axios from "axios";
import { ToolType, getToolsType } from "@/types";
import ToolsCard from "../toolsCard";
import Link from "next/link";
import { ArrowLeftLotie } from "../index";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function MostRecentTools() {
  async function getTools(): Promise<ToolType[]> {
    try {
      const { data }: { data: getToolsType } = await axios.get(
        `${apiUrl}/api/tools?number=12&pages=1&orderby=desc`
      );
      return data.tools;
    } catch (error) {
      return [];
    }
  }

  const tools: ToolType[] = (await getTools()) || [];
  return (
    <section className="py-24 container">
      <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
        <h2 className="text-3xl font-bold mb-8">Les plus recents</h2>
        <Link
          href={"/tools"}
          className="flex items-center gap-2 font-semibold text-violet-500 mb-8"
        >
          Voir Plus
          <ArrowLeftLotie />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolsCard key={`${tool.id}__most_recent`} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default MostRecentTools;
