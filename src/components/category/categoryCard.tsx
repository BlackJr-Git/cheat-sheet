import Link from "next/link";
function categoryCard({
  category,
}: {
  category: { id: number; name: string; icone: string };
}) {
  return (
    <Link
      href={"/"}
      className=" bg-blue-100 hover:bg-blue-200 cursor-pointer transition p-3 rounded-xl flex flex-1 min-w-48 items-center gap-3"
    >
      <div className="">{category.icone}</div>
      {category.name}
    </Link>
  );
}

export default categoryCard;
