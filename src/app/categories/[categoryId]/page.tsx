import { ToolsCard } from "@/components";
import { ToolType } from "@/types";
import axios from "axios";
import Image from "next/image";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function Page({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;

  async function getCatagories() {
    try {
      const { data } = await axios.get(`${apiUrl}/api/category/${categoryId}?page=1&pageSize=12`);
      return data.category;
    } catch (error) {
      return [];
    }
  }

  const category = await getCatagories();
  const tools = category.tools;

  return (
    <main className="container my-4">
      
      <section className="relative">
        <div className="p-12 bg-green-500/30 flex justify-center items-center flex-col gap-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-semibold">
            {category.icon} {category.name}
          </h1>
          <p className="text-lg">
            {tools?.length} outils disponibles dans la categorie {category.name}{" "}.
            Trouvez ce dont vous avez besoin
          </p>
        </div>

        <Image
          src="/cheat-sheet-arrow-green.png"
          alt="hero icon"
          width={150}
          height={150}
          className="absolute bottom-0 left-0"
        />
        <Image
          src="/cheat-sheet-arrow-violet.png"
          alt="hero icon"
          width={150}
          height={150}
          className="absolute bottom-0 right-0"
        />
      </section>

      <section className="py-12">
        <div className="flex items-center justify-center flex-wrap gap-6">
          {category.tools?.map((tool: any) => (
            <ToolsCard key={tool.tool.id} tool={tool.tool} />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Page;
