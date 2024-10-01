import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="py-4">
      <header className="flex items-center justify-between px-12 py-3 container border-2 rounded-3xl fixed top-5 left-0 right-0 z-50 backdrop-blur">
        <div>
          {/* <Image src="/logo.png" alt="logo" width={100} height={100} /> */}
          <p className="text-2xl font-extrabold">LOGO</p>
        </div>
        <nav className=" hidden items-center justify-center gap-8 text-lg font-semibold md:flex">
          <div className="relative group">
            <Link href={"/"}>Acceuil</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          <div className="relative group">
            <Link href={"/categories"}>Sujets</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          <div className="relative group">
            <Link href={"/"}>NewsLetter</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </nav>
        <div className="flex items-center justify-center gap-3">
          <Button variant={"outline"}>Connexion</Button>
          <Button>S&apos;inscrire</Button>
        </div>
      </header>
    </div>
  );
}

export default Header;
