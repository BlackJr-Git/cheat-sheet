"use client";
import { useParams } from "next/navigation";

function Page() {
  const { category } = useParams();
  return (
    <main>
      <p>{category}</p>
    </main>
  );
}

export default Page;
