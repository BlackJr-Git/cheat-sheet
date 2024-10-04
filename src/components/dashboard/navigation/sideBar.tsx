import { UserAvatar } from "@/components";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  return (
    <header className="flex flex-col items-center justify-between w-1/5 bg-violet-500 h-[70vh] rounded-2xl p-4">
      <div>
        <UserAvatar />
      </div>
      <div>
        <nav>
          <ul className="flex flex-col gap-3">
            <li className="text-white border-2 border-slate-100 px-4 py-2 rounded-md">
              Acceuil
            </li>
            <li className="text-white border-2 border-slate-100 px-4 py-2 rounded-md">
              Ressources
            </li>
            <li className="text-white border-2 border-slate-100 px-4 py-2 rounded-md">
              Categories
            </li>
            <li className="text-white border-2 border-slate-100 px-4 py-2 rounded-md">
              Blog
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full">
        <Button className="w-full">Deconnexion</Button>
      </div>
    </header>
  );
}
