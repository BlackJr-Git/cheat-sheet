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

export default function SideBar() {
  return (
    <header className="flex flex-col items-center justify-between w-1/5 bg-violet-500 h-[70vh] rounded-2xl p-4">
      <div>
        <UserAvatar />
      </div>

      <div className="w-full">
        <nav>
          <ul className="flex flex-col gap-3 w-full">
            <li className="text-white px-4 py-2 rounded-md w-full hover:bg-white/10">
              <Link href={"/dashboard/"} className="flex items-center gap-2">
                <HomeIcon className="size-8" /> Acceuil
              </Link>
            </li>
            <li className="text-white px-4 py-2 rounded-md w-full hover:bg-white/10">
              <Link
                href={"/dashboard/tools"}
                className="flex items-center gap-2"
              >
                <WrenchScrewdriverIcon className="size-8" /> Ressources
              </Link>
            </li>
            <li className="text-white px-4 py-2 rounded-md w-full hover:bg-white/10">
              <Link
                href={"/dashboard/categories"}
                className="flex items-center  gap-2"
              >
                <Squares2X2Icon className="size-8" /> Categories
              </Link>
            </li>
            <li className="text-white px-4 py-2 rounded-md w-full hover:bg-white/10">
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
      <div className="w-full">
        <Button className="w-full flex items-center justify-center gap-2">
          Deconnexion <ArrowRightStartOnRectangleIcon className="size-8" />{" "}
        </Button>
      </div>
    </header>
  );
}
