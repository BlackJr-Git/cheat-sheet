import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function Page({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;

  async function getCatagories() {
    try {
      const { data } = await axios.get(`${apiUrl}/api/category/${categoryId}`);
      return data.categories;
    } catch (error) {
      return [];
    }
  }

  const category = (await getCatagories()) || {};

  return <div>{category.name}</div>;
}

export default Page;
