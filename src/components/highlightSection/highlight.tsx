const tool = {
  title: "SchemeColor",
  image:
    "https://res.cloudinary.com/devhqdrwl/image/upload/v1727704276/cheat-sheet/Screenshot_2024-09-30_145051_ojws8v.png",
  description:
    "Plateforme offrant des palettes de couleurs prêtes à l'emploi pour le design, le branding, et les projets créatifs. Permet de créer, télécharger et partager des combinaisons de couleurs personnalisées.",
  url: "https://www.schemecolor.com/",
  published: true,
};

export default function Highlight() {
  return (
    <section className="container">
      <h2 className="text-3xl font-bold mb-8 text-center">
        La pepite du moment
      </h2>
      <div className="flex items-center flex-wrap gap-6 justify-center border-2 border-violet-500 h-96 w-full rounded-2xl">
        <div></div> 
      </div>
    </section>
  );
}
 