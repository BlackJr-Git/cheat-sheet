"use client";

import { useParams } from "next/navigation";

function Page() {
  const { category } = useParams();
  return <div>{category}</div>;
}

export default Page;
