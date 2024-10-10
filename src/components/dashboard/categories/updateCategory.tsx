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
import { useToast } from "@/hooks/use-toast";
// import { categoryType } from "@/types";

import {
  TrashIcon,
  PencilSquareIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function UpdateCategory({ category }: { category: any }) {
  const [categories, setCategories] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [data, setData] = useState({
    name: category.name,
    icon: category.icon,
  });

  useEffect(() => {
    setCategories(category.categories);
  }, [category]);

  function deleteCategory(id: number) {
    try {
      setIsLoading(true);
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`)
        .then((res) => {
          console.log(res);
          toast({
            title: "Catégorie supprimée",
            description: "Catégorie supprimée avec succès",
          });
        });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

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
            {isLoading ? (
              <Button
                variant={"destructive"}
                className="flex items-center gap-2"
              >
                Supprimer role{" "}
                <ArrowPathIcon className="w-6 h-6 animate-spin" />{" "}
              </Button>
            ) : (
              <Button
                variant={"destructive"}
                onClick={() => deleteCategory(category.id)}
                className="flex items-center gap-2"
              >
                Supprimer <TrashIcon className="w-6 h-6" />{" "}
              </Button>
            )}
            <Button className="w-full grow">Enregistrer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
