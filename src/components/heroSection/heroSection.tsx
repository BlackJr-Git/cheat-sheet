import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

function HeroSection() {
  return (
    <section className=" h-96 flex flex-col gap-12 items-center justify-center relative">
      <h1 className="text-4xl font-bold text-center flex flex-col gap-4 w-full">
        <span>Trouvez les meilleurs outils IA</span>
        <span>pour gagner de la <span className="text-green-500 bg-violet-700 p-2">productivité</span></span>
      </h1>
      <div className="w-[90%] h-60 px-6 bg-blue-100/0 rounded-xl flex md:flex-row flex-col gap-3 items-center justify-center backdrop-blur-sm z-50">
        <Input
          className="md:w-1/2 h-12"
          placeholder="Rechercher par category"
        />{" "}
        <Button className="md:w-48 w-full h-12 flex gap-3 text-lg">
          {" "}
          <span>🔍</span> Rechercher
        </Button>
      </div>
      <Image
        src="/cheat-sheet-arrow-green.png"
        alt="hero icon"
        width={300}
        height={300}
        className="absolute bottom-0 left-0"
      />
      <Image
        src="/cheat-sheet-arrow-violet.png"
        alt="hero icon"
        width={300}
        height={300}
        className="absolute bottom-0 right-0"
      />
    </section>
  );
}

export default HeroSection;
