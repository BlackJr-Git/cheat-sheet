import Image from "next/image";
import { Input   } from "../ui/input";
import { Button } from "../ui/button";

export default function NewsletterSection() {
  return (
    <section className="container">
      <div className="w-full h-72 bg-background p-4 hidden md:block">
        <div className="w-full h-full bg-violet-300 relative flex rounded-3xl backdrop-blur-xl">
          
          <div className="w-1/2 h-1/2 bg-violet-300 absolute top-0 left-0 rounded-tl-3xl flex items-center px-12 border-t-2 border-l-2 border-violet-500">
            <h2 className="text-3xl font-bold">Newsletter</h2>
          </div>

          <div className="w-1/2 h-1/2 flex justify-center gap-2 flex-col bg-violet-300 absolute top-0 right-0 rounded-r-3xl z-10 border-b-2 border-t-2 border-r-2 border-violet-500 px-12">
            <p className="text-lg ml-2">Inscrivez-vous à notre newsletter</p>
            <div className="w-full flex gap-2">
            <Input placeholder="Email" className="w-full" />
            <Button className="w-1/3">S&apos;inscrire</Button>
            </div>
          </div>
          <div className="w-1/2 h-1/2 bg-background absolute top-0 right-0"></div>

          <div className="w-1/2 h-1/2 bg-violet-300 absolute bottom-0 left-0 rounded-b-3xl z-10 px-12 border-b-2 border-l-2 border-r-2 border-violet-500">
            <Image
              src="/newsletter-2.png"
              alt="girl announcing"
              width={300}
              height={300}
              className="absolute bottom-0 left-96"
            />
            <div className="text-lg">
              <p>Abonnez-vous à notre newsletter </p>
              <p>pour accéder aux nouvelles</p>
              <p>ressources dès leur ajout !</p>
            </div>
          </div>
          <div className="w-1/2 h-1/2 bg-background absolute bottom-0 left-0"></div>

          <div className="w-1/2 h-1/2 bg-background absolute bottom-0 right-0 rounded-tl-3xl"></div>
        </div>
      </div>
    </section>
  );
}
