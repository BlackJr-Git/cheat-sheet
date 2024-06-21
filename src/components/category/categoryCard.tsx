import Link from "next/link";
function categoryCard({
  category,
}: {
  category: { id: number; name: string; icon: string };
}) {
  return (
    <Link
      href={"/"}
      className=" bg-blue-100 hover:bg-blue-200 cursor-pointer transition p-3 rounded-3xl flex flex-1 md:min-w-48 items-center gap-3"
    >
      <div className="">{category.icon}</div>
      <p className="line-clamp-1">{category.name}</p>
    </Link>
  );
}

export default categoryCard;
