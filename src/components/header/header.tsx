import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="border-b border-slate-100">
      <header className="flex items-center justify-between px-12 py-3  container">
        <div>
          {/* <Image src="/logo.png" alt="logo" width={100} height={100} /> */}
          <p className="text-2xl font-extrabold">LOGO</p>
        </div>
        <nav className=" hidden items-center justify-center gap-6 text-lg font-semibold md:flex">
          <Link href={"/"}>Acceuil</Link>
          <Link href={"/"}>Sujets</Link>
          <Link href={"/"}>NewsLetter</Link>
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
