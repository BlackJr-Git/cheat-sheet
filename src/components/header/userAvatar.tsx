import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Fragment } from "react";

export default function UserAvatar() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Junior Asosa</AvatarFallback>
      </Avatar>
      {/* <p className="text-lg font-bold text-white">Junior Asosa</p> */}
    </div>
  );
}
