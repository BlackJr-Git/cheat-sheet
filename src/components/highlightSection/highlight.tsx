import Image from "next/image";
import { BookmarkButton, LikeButton } from "..";
import { Button } from "../ui/button";
import { Eye, Share } from "lucide-react";

const tool = {
  title: "V0.dev",
  image:
    "https://res.cloudinary.com/devhqdrwl/image/upload/v1727770249/cheat-sheet/Screenshot_2024-10-01_085640_ibnhgg.png",
  description:
    "Plateforme de développement no-code offrant des outils pour créer, tester et déployer des applications sans écrire de code, avec des intégrations pour plusieurs services.",
  url: "https://www.schemhttps://v0.dev/ecolor.com/",
  published: true,
  userLikes: [],
};

export default function Highlight() {
  return (
    <section className="container py-24">
      <h2 className="text-3xl font-bold mb-8 text-center">
        La pepite du moment
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6 justify-center border-2 w-full rounded-2xl p-8">
        <div className="md:w-1/3">
          <Image
            src={tool.image}
            alt={tool.title}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-2xl drop-shadow-lg"
          />
        </div>

        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>
          <p className="text-lg mb-4">{tool.description}</p>

          <div className="flex md:flex-row flex-col gap-4">
            <Button className="w-full text-lg grow">
              <a
                href={tool.url}
                target="_blank"
                className="w-full text-lg grow flex gap-4 items-center justify-center"
              >
                Visiter le site <Eye />
              </a>
            </Button>
            <div className="flex gap-2">
              <LikeButton likes={tool.userLikes?.length || 0} />
              <Button className="text-lg flex gap-2 bg-transparent hover:bg-green-200 border-green-300 text-green-500">
                <Share />
              </Button>
              <BookmarkButton bookmarks={0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
