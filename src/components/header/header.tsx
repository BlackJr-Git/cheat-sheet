"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  // {open && return <MobileHeader setOpen={setOpen} />}
  if (open) {
    return <MobileHeader setOpen={setOpen} />
  }
  return (
    <div className="py-4">
      <header className="flex items-center justify-between px-6 py-3 container border-2 rounded-3xl fixed top-3 left-0 right-0 z-40 backdrop-blur">
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
            <Link href={"/categories"}>Categories</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          <div className="relative group">
            <Link href={"/"}>Blog</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </nav>
        <div className="items-center justify-center gap-3 md:flex hidden">
          <Button variant={"outline"}>Connexion</Button>
          <Button>S&apos;inscrire</Button>
        </div>
          
          <Bars3CenterLeftIcon
            className="w-8 h-8 md:hidden"
            onClick={() => setOpen(!open)}
          />
        {/* <Bars3CenterLeftIcon
          className="w-8 h-8"
          onClick={() => setOpen(!open)}
        /> */}
        
      </header>
      
    </div>
  );
}

export default Header;

function MobileHeader({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <div className="">
      <header className="flex flex-col items-center justify-between px-6 py-3 container border-2 rounded-3xl absolute top-0 left-0 right-0 z-50 backdrop-blur-md h-screen">
        <div className="flex items-center justify-between w-full  mb-8">
          <p className="text-2xl font-extrabold">LOGO</p>
          <XMarkIcon className="w-8 h-8" onClick={() => setOpen(false)} />
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 text-lg font-semibold md:hidden">
          <div className="relative group">
            <Link href={"/"}>Acceuil</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
          <div className="relative group">
            <Link href={"/categories"}>Categories</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
          <div className="relative group">
            <Link href={"/"}>Blog</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </nav>
        <div className="items-center justify-center gap-3 flex flex-col w-full mt-8">
          <Button variant={"outline"} className="w-full">Connexion</Button>
          <Button className="w-full">S&apos;inscrire</Button>
        </div>
      </header>
    </div>
  );
}
