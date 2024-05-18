import { CategoryCard, CategoryCarousel } from "..";
function Categories() {
  const categories = [
    {
      id: 1,
      name: "Design",
      icone: "🧑‍🎨",
    },
    {
      id: 2,
      name: "Dev",
      icone: "🧑‍💻",
    },
    {
      id: 3,
      name: "Animation",
      icone: "🎬",
    },
    {
      id: 4,
      name: "UX",
      icone: "🧑‍🔧",
    },
    {
      id: 5,
      name: "UI",
      icone: "🏙️",
    },
    {
      id: 6,
      name: "Branding",
      icone: "🧑‍🎨",
    },
    {
      id: 7,
      name: "Photography",
      icone: "📸",
    },
    {
      id: 8,
      name: "Music",
      icone: "🎵",
    },
    {
      id: 9,
      name: "Gaming",
      icone: "🎮",
    },
    {
      id: 10,
      name: "Technology",
      icone: "💻",
    },
    {
      id: 11,
      name: "Books",
      icone: "📚",
    },
    {
      id: 12,
      name: "AI Tools",
      icone: "🤖",
    },
  ];

  return (
    <div className="my-12">
      <h1 className="text-lg my-6">SUJETS A LA UNE</h1>
      <div className="md:flex flex-wrap gap-4 justify-center my-12 hidden">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <CategoryCarousel categories={categories} />
    </div>
  );
}

export default Categories;
