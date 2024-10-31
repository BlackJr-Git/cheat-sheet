"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  BookmarkIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

function Header() {
  const [open, setOpen] = useState(false);

  if (open) {
    return <MobileHeader setOpen={setOpen} />;
  }

  return (
    <div className="py-4">
      <header className="flex items-center justify-between px-6 py-3 container border-2 rounded-3xl fixed top-3 left-0 right-0 z-40 backdrop-blur">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={150} height={150} />
        </Link>
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
            <Link href={"/blog"}>Blog</Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          <SignedIn>
            <div className="relative group">
              <Link href={"/bookmark"}>Mes favoris</Link>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
          </SignedIn>
        </nav>

        <div className="items-center justify-center gap-3 md:flex hidden">
          <SignedOut>
            <SignInButton>
              <Button variant={"outline"}>Connexion</Button>
            </SignInButton>

            <SignUpButton>
              <Button>S&apos;inscrire</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverCard: "bg-violet-100",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Favoris"
                  labelIcon={<BookmarkIcon />}
                  href="/bookmark"
                  // onClick={() => alert("init chat")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        <Bars3CenterLeftIcon
          className="w-8 h-8 md:hidden"
          onClick={() => setOpen(!open)}
        />
      </header>
    </div>
  );
}

export default Header;

function MobileHeader({ setOpen }: { setOpen: (open: boolean) => void }) {

  return (
    <div className="">
      <header className="flex flex-col w-full items-center justify-between px-6 py-3 container border-2 fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl h-dvh">
        <div className="flex items-center justify-between w-full mb-8">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={150} height={150} />
          </Link>
          <XMarkIcon className="w-8 h-8" onClick={() => setOpen(false)} />
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 text-lg font-semibold md:hidden">
          <div className="relative group">
            <Link href={"/"} onClick={() => setOpen(false)}>
              Acceuil
            </Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
          <div className="relative group">
            <Link href={"/categories"} onClick={() => setOpen(false)}>
              Categories
            </Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
          <div className="relative group">
            <Link href={"/blog"} onClick={() => setOpen(false)}>
              Blog
            </Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          <SignedIn>
            <div className="relative group">
              <Link href={"/bookmark"} onClick={() => setOpen(false)}>
                Mes favoris
              </Link>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
          </SignedIn>
        </nav>

        <div className="flex items-center w-full flex-col gap-4 mb-12">
          <SignedOut>
            <SignInButton>
              <Button variant={"outline"}>Connexion</Button>
            </SignInButton>

            <SignUpButton>
              <Button>S&apos;inscrire</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverCard: "bg-violet-100",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Favoris"
                  labelIcon={<BookmarkIcon />}
                  href="/bookmark"
                  // onClick={() => alert("init chat")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
