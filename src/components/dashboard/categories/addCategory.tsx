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
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CategoryType } from "@/types";

import {
  TrashIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(data: CategoryType) {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
        data
      );
      console.log(response);
      toast({
        title: "Catégorie ajoutée",
        description: "Catégorie ajoutée avec succès",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: "Catégorie non ajoutée",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-full p-2 hover:bg-violet-300 cursor-pointer bg-violet-200 flex justify-center items-center gap-4">
        <PlusCircleIcon className="w-6 h-6" />
        Ajouter une category
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-scroll scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Ajouter une catégorie</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center flex-col p-4 gap-4 w-full bg-white rounded-xl overflow-y-scroll scrollbar-hide"
        >
          <div className="flex flex-col gap-2 w-full">
            <Input
              placeholder="icon de la catégorie ex : (🕹️,📸)"
              {...register("icon", {
                required: "Ce champ est obligatoire",
                //   pattern: {
                //     message: "Ce champ n'est pas une emoji valide",
                //   },
              })}
              className={`rounded-xl ${
                errors.icon ? "focus-visible:ring-red-500" : ""
              }`}
            />
            <div className="flex items-center justify-end h-1 m-1">
              {errors.icon && (
                <p className="text-red-500 text-sm">{errors?.icon.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Input
              placeholder="Nom de la catégorie"
              {...register("name", {
                required: "Ce champ est obligatoire",
              })}
              className={`rounded-xl ${
                errors.name ? "focus-visible:ring-red-500" : ""
              }`}
            />
            <div className="flex items-center justify-end h-1 m-1">
              {errors.name && (
                <p className="text-red-500 text-sm">{errors?.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 w-full">
            {isLoading ? (
              <Button className="w-full grow flex gap-4 items-center justify-center">
                <ArrowPathIcon className="w-6 h-6 animate-spin" />
              </Button>
            ) : (
              <Button className="w-full grow flex gap-4 items-center justify-center">
                Ajouter <PlusCircleIcon className="w-6 h-6" />
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
