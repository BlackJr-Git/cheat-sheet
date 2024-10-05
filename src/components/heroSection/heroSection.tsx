import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { ToolBubble, MottionBubble } from "@/components";
import { ChangingWords } from "../animation";

function HeroSection() {
  return (
    <section className="flex flex-col gap-12 items-center justify-center relative h-[100vh] bg-[url('/gradient.svg')] bg-center bg-cover">
      <h1 className="text-4xl font-bold text-center flex flex-col gap-4 w-full">
        <span className="">
          Trouvez les meilleurs outils <ChangingWords />
        </span>
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
        className="absolute bottom-16 left-24 -rotate-[60deg] hidden md:block"
      />
      <Image
        src="/cheat-sheet-arrow-violet.png"
        alt="hero icon"
        width={300}
        height={300}
        className="absolute top-12 right-48 hidden md:block"
      />
      {/* <MottionBubble /> for desktop device */}
      <ToolBubble
        icon={"/bubble_logo/Figma-01.svg"}
        className="absolute 8 md:bottom-96 md:left-24 z-20 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse hidden md:block"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/Figma-01.svg"}
        className="absolute  md:bottom-48 md:right-72 z-20 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse hidden md:block"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/sp.png"}
        className="absolute  md:top-24 md:left-72 z-20 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse hidden md:block"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/chat-gpt.png"}
        className="absolute  md:top-72 md:right-32 z-20 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse hidden md:block"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/flowbite.svg"}
        className="absolute md:top-12 md:left-[40%] z-20 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse hidden md:block "
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/notion.svg"}
        className="absolute md:bottom-32 md:right-[40%] z-20 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse hidden md:block"
      />{" "}
      {/* <MottionBubble /> for mobile device */}
      <ToolBubble
        icon={"/bubble_logo/Figma-01.svg"}
        className="absolute top-52 left-40 z-20 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse md:hidden"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/Figma-01.svg"}
        className="absolute  top-20 right-[50%] z-20 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse md:hidden"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/sp.png"}
        className="absolute top-40 left-72 z-20 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse md:hidden"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/chat-gpt.png"}
        className="absolute top-4 left-4 z-20 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse md:hidden"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/flowbite.svg"}
        className="absolute top-2 right-6 z-20 backdrop-blur border-2 border-green-500 drop-shadow-md animate-pulse md:hidden"
      />{" "}
      <ToolBubble
        icon={"/bubble_logo/notion.svg"}
        className="absolute top-40 left-4 z-20 backdrop-blur border-2 border-violet-500 drop-shadow-md animate-pulse md:hidden"
      />{" "}
    </section>
  );
}

export default HeroSection;
