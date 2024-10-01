"use client";
import { useParams } from "next/navigation";

type Params = {
  category: string;
};


function Page() {
  // const { category  }  = useParams()<Params>();
  const params = useParams();
  const category = params?.category ?? 'default';

  return (
    <main>
      <p>{category}</p>
    </main>
  );
}

export default Page;
