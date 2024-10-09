"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
// import { categoryType } from "@/types";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function UpdateCategory({ category }: { category: any }) {
  const [categories, setCategories] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: category.name,
    icon: category.icon,
  });

  useEffect(() => {
    setCategories(category.categories);
  }, [category]);

  return (
    <Dialog>
      <DialogTrigger>
        <PencilSquareIcon className="w-6 h-6 text-violet-500" />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-scroll scrollbar-hide">
        <DialogHeader>
          <DialogTitle>{category.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex justify-center items-center flex-col p-4 gap-4 w-full bg-white rounded-xl overflow-y-scroll scrollbar-hide">
          <Input
            placeholder=""
            value={category.icon}
            onChange={(e) => console.log(e.target.value)}
            className="rounded-xl"
          />
          <Input
            placeholder=""
            value={category.name}
            onChange={(e) => console.log(e.target.value)}
            className="rounded-xl"
          />
          <div className="flex gap-4 w-full">
            <Button variant={"destructive"} className="flex items-center gap-2" >Supprimer <TrashIcon className="w-6 h-6" /> </Button>
            <Button className="w-full grow">Enregistrer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
