import Link from "next/link";
import {Send} from "lucide-react"
function categoryCard({
  category,
}: {
  category: { id: number; name: string; icon: string };
}) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className=" bg-violet-100 hover:bg-violet-200 cursor-pointer transition p-3 rounded-3xl flex flex-1 md:min-w-48 items-center gap-3"
    >
      <div className="">{category.icon}</div>
      <p className="line-clamp-1">{category.name}</p>
    </Link>
  );
}

export default categoryCard;
