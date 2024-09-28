import { CategoryCard, CategoryCarousel } from "..";
import { CategoryType } from "@/types";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function Categories() {
  async function getCatagories() {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/category?number=12&pages=1`
      );
      return data.categories;
    } catch (error) {
      return [];
    }
  }

  const cate = (await getCatagories()) || [];

  return (
    <div className="my-12">
      <h1 className="text-lg my-6">SUJETS A LA UNE</h1>
      <div className="md:flex flex-wrap gap-4 justify-center hidden">
        {cate.map((category: CategoryType) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <CategoryCarousel categories={cate} />
    </div>
  );
}
