import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "./userAvatar";
import { userType } from "@/types";
import {
  UserIcon,
  LightBulbIcon,
  BookmarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UserPopover({ user }: { user: userType }) {
  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar />
      </PopoverTrigger>
      <PopoverContent className="rounded-3xl">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
          <UserAvatar />
          <p className="text-lg font-semibold">{user.name}</p>
        </div>
        <div className=" flex flex-col justify-center gap-3 border-b border-slate-100 px-6 py-4">
          <Link
            href="/favorites"
            className="flex items-center gap-3 hover:bg-violet-200 rounded-lg p-3"
          >
            <BookmarkIcon className="w-6 h-6" />
            <p className="text-lg font-semibold">Mes favoris</p>
          </Link>
          <Link
            href="/suggest"
            className="flex items-center gap-3 hover:bg-violet-200 rounded-lg p-3"
          >
            <LightBulbIcon className="w-6 h-6" />
            <p className="text-lg font-semibold">Suggerer</p>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 hover:bg-violet-200 rounded-lg p-3"
          >
            <UserIcon className="w-6 h-6" />
            <p className="text-lg font-semibold">Mon profil</p>
          </Link>
        </div>

        <div className="flex flex-col justify-center gap-3 px-6 py-4">
          <button className="flex items-center gap-3 hover:bg-violet-200 rounded-lg p-3">
            <p className="text-lg font-semibold">Se deconnecter</p>
            <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
