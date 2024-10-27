"use client";
import { UserAvatar } from "@/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  ArrowRightStartOnRectangleIcon,
  Squares2X2Icon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const currentPage = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return <p>Chargement...</p>;
  }

  return (
    <header className="flex flex-col items-center gap-8 w-1/5 bg-violet-500 rounded-2xl px-4 py-8 h-[90vh]">
      <div className="text-center font-bold">
        <h1 className="text-xl text-white">The cheat sheet</h1>
      </div>

      <div className="w-full">
        <nav>
          <ul className="flex flex-col gap-3 w-full">
            <li
              className={` ${
                currentPage === "/dashboard"
                  ? "bg-white text-violet-500 font-bold fill-violet-500"
                  : "text-white hover:bg-white/10"
              } px-4 py-2 rounded-md w-full`}
            >
              <Link href={"/dashboard/"} className="flex items-center gap-2">
                <HomeIcon className="size-8" /> Acceuil
              </Link>
            </li>
            <li
              className={` ${
                currentPage === "/dashboard/tools"
                  ? "bg-white text-violet-500"
                  : "text-white hover:bg-white/10"
              } px-4 py-2 rounded-md w-full`}
            >
              <Link
                href={"/dashboard/tools"}
                className="flex items-center gap-2"
              >
                <WrenchScrewdriverIcon className="size-8" /> Ressources
              </Link>
            </li>
            <li
              className={` ${
                currentPage === "/dashboard/categories"
                  ? "bg-white text-violet-500"
                  : "text-white hover:bg-white/10"
              } px-4 py-2 rounded-md w-full`}
            >
              <Link
                href={"/dashboard/categories"}
                className="flex items-center  gap-2"
              >
                <Squares2X2Icon className="size-8" /> Categories
              </Link>
            </li>
            <li
              className={` ${
                currentPage === "/dashboard/suggestion"
                  ? "bg-white text-violet-500"
                  : "text-white hover:bg-white/10"
              } px-4 py-2 rounded-md w-full`}
            >
              <Link
                href={"/dashboard/suggestion"}
                className="flex items-center gap-2"
              >
                <LightBulbIcon className="size-8" /> Suggestion
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="w-full justify-end">
        <SignedIn>
          <div className="flex items-center justify-center gap-2 text-white">
            <UserButton />
            {user.fullName || user.username || "Admin"}
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
