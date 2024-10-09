"use client";
import { ToolType, getCategoryType, CategoryType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryCard } from "@/components";
import { DashboardCategoryCard } from "@/components/dashboard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [categories, setCategories] = useState([] as CategoryType[]);

  useEffect(() => {
    async function getCategories(): Promise<CategoryType[]> {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/category?number=30&pages=1`
        );
        setCategories(data.categories);
        return data.categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    }

    getCategories();
  }, []);
  return (
    <div className="w-full bg-slate-100 grow rounded-2xl p-4 max-h-[90%] flex gap-4">
      <div className="flex items-center flex-wrap gap-4 w-full overflow-y-scroll scrollbar-hide">
        {categories?.map((category) => (
          <DashboardCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
