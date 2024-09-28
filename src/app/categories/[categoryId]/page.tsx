"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { CategoryType } from "@/types";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
function Page() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({} as CategoryType);

  useEffect(() => {
    async function getCategory() {
      const { data } = await axios.get(
        `${apiUrl}/api/category/${categoryId}`
      );
      setCategory(data);
      console.log(data);
      
    }

    getCategory();
  }, [categoryId]);

  // return <>Category</>
  return <div>{category.name}</div>;
}

export default Page;
