import Link from "next/link";
import { SquarePen } from "lucide-react";
import UpdateCategory from "./updateCategory";
function DashboardCategoryCard({
  category,
}: {
  category: { id: number; name: string; icon: string; tools: [] };
}) {
  return (
    <div
      // href={`/categories/${category.id}`}
      className="bg-violet-100 hover:bg-violet-200 cursor-pointer grow transition p-3 rounded-3xl flex md:min-w-48 items-center gap-3 border-2 border-violet-300"
    >
      <div className="flex justify-center items-center bg-white p-3 rounded-full w-12 h-12">
        {category.icon}
      </div>
      <div className="w-full">
        <p className="line-clamp-1">{category.name}</p>
        <p className="text-slate-500 flex items-center justify-between line-clamp-1">
          {category.tools?.length} outils{" "}
          {/* <ArrowDownRight className="text-violet-500 hidden md:block" />{" "} */}
          {/* <SquarePen className="text-violet-500" /> */}
          <UpdateCategory category={category} />
        </p>
      </div>
    </div>
  );
}

export default DashboardCategoryCard;
