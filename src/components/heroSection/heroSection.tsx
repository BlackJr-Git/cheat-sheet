import { Input } from "../ui/input";
import { Button } from "../ui/button";

function HeroSection() {
  return (
    <section className="w-full h-60 px-6 bg-blue-100 rounded-xl flex md:flex-row flex-col gap-3 items-center justify-center">
      <Input className="md:w-1/2 h-12" />{" "}
      <Button className="md:w-48 w-full h-12 flex gap-3 text-lg">
        {" "}
        <span>🔍</span> Rechercher
      </Button>
    </section>
  );
}

export default HeroSection;
