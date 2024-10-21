"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useStore, StoreType } from "@/appStore";
import { userType } from "@/types";
import { UserPopover } from "@/components";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

function Header() {
  const [open, setOpen] = useState(false);

  const {
    currentUser,
    setCurrentUser,
  }: {
    currentUser: userType | null;
    setCurrentUser: (currentUser: userType) => void;
  } = useStore() as StoreType;

  // const user = {
  //   id: 1,
  //   name: "John Doe",
  //   email: "lqfZg@example.com",
  //   image: "https://example.com/avatar.jpg",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     return;
  //   }
  //   setCurrentUser(user);
  // }, [currentUser]);

  if (open) {
    return <MobileHeader setOpen={setOpen} />;
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
                <UserButton.Action
                  label="Open chat"
                  labelIcon={<DotIcon />}
                  onClick={() => alert("init chat")}
                />
                <UserButton.Link
                  label="Create organization"
                  labelIcon={<DotIcon />}
                  href="/create-organization"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        {/* <div className="items-center justify-center gap-3 md:flex hidden">
          {currentUser ? (
            <UserPopover user={currentUser} />
          ) : (
            <>
              <Link href={"/auth/sign-in"}>
                <Button variant={"outline"}>Connexion</Button>
              </Link>
              <Link href={"/auth/sign-up"}>
                <Button>S&apos;inscrire</Button>{" "}
              </Link>
            </>
          )}
        </div> */}

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
  const {
    currentUser,
    setCurrentUser,
  }: {
    currentUser: userType | null;
    setCurrentUser: (currentUser: userType) => void;
  } = useStore() as StoreType;

  // const user = {
  //   id: 1,
  //   name: "John Doe",
  //   email: "lqfZg@example.com",
  //   image: "https://example.com/avatar.jpg",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  useEffect(() => {
    if (currentUser) {
      return;
    }
    // setCurrentUser(user);
  }, [currentUser]);

  return (
    <div className="">
      <header className="flex flex-col w-full items-center justify-between px-6 py-3 container border-2 fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl h-dvh">
        <div className="flex items-center justify-between w-full  mb-8">
          <p className="text-2xl font-extrabold">LOGO</p>
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
            <Link href={"/"} onClick={() => setOpen(false)}>
              Blog
            </Link>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </nav>

        <div className="flex w-full flex-col gap-4 mb-12">
          {currentUser ? (
            <UserPopover user={currentUser} />
          ) : (
            <>
              <Link href={"/auth/sign-up"} className="w-full inline-block">
                <Button className="w-full">S&apos;inscrire</Button>{" "}
              </Link>
              <Link href={"/auth/sign-in"} className="w-full">
                <Button variant={"outline"} className="w-full">
                  Connexion
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
