import axios from "axios";
import { ToolType, getToolsType } from "@/types";
import { HeroSection, Categories, BestTools, MostRecentTools } from "@/components";

export default function Home() {
  return (
    <main className="container py-12">
      <HeroSection />
      <Categories />
      <BestTools />
      <MostRecentTools />
    </main>
  );
}

