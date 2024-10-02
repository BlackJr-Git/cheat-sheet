import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { ToolBubble } from "@/components";

function HeroSection() {
  return (
    <section className="flex flex-col gap-12 items-center justify-center relative mt-12 h-[60vh]">
      <h1 className="text-4xl font-bold text-center flex flex-col gap-4 w-full">
        <span>Trouvez les meilleurs outils IA</span>
        <span>
          pour gagner de la{" "}
          <span className="text-green-600 bg-white p-2">productivité</span>
        </span>
      </h1>
      <div className="w-[90%] px-6 bg-blue-100/0 rounded-xl flex md:flex-row flex-col gap-3 items-center justify-center">
        <Input
          className="md:w-1/2 h-12"
          placeholder="Rechercher par category"
        />{" "}
        {/* <Button className="md:w-48 w-full h-12 flex gap-3 text-lg">
          {" "}
          <span>🔍</span> Rechercher
        </Button> */}
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
        className="absolute bottom-64 right-0"
      /> 
      <ToolBubble className="absolute bottom-72 left-12 z-50 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse" /> {/* OK */}
      <ToolBubble className="absolute bottom-24 right-64 z-50 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse" /> {/* OK */}
      <ToolBubble className="absolute top-24 left-64 z-50 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse" /> {/* OK */}
      <ToolBubble className="absolute top-72 right-24 z-50 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse" /> {/* OK */}
      <ToolBubble className="absolute top-16 left-[40%] z-50 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse" /> {/* OK */}
      <ToolBubble className="absolute bottom-12 right-[40%] z-50 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse" /> {/* OK */}
    </section>
  );
}

export default HeroSection;
