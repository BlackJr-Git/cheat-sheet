"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function Page() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    async function getCategory() {
      const { data } = await axios.get(
        `http://localhost:3000/api/category/${categoryId}`
      );
      setCategory(data);
    }

    getCategory();
  }, [categoryId]);

  return <div>{category.name}</div>;
}

export default Page;
