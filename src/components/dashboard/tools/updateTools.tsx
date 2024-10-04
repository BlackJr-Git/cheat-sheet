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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { CategoryCombobox } from "@/components/dashboard";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToolType } from "@/types";

export default function UpdateToolsDialog({ tool }: { tool: any }) {
  const [categories, setCategories] = useState([]);

  const [addedCategory, setAddedCategory] = useState({
    toolId: tool.id,
    categoryId: "",
  });

  useEffect(() => {
    setCategories(tool.categories);
  }, [tool]);

  function getCategoryId(categoryId: any) {
    setAddedCategory({
      ...addedCategory,
      categoryId: categoryId,
    });
  }

  async function addCategory() {
    if (addedCategory.categoryId) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tools/tool-category`,
          addedCategory
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-full p-2 hover:bg-violet-200 cursor-pointer bg-violet-400 w-full">
        Modifier
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tool.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex justify-center items-center flex-col p-4 gap-4 w-full bg-white rounded-xl overflow-y-scroll scrollbar-hide">
          <div>
            <Image
              priority
              className="rounded-lg"
              src={tool.image}
              alt="logo"
              width={500}
              height={400}
            />
          </div>
          <Input
            placeholder=""
            value={tool.title}
            onChange={(e) => console.log(e.target.value)}
          />
          <Input
            placeholder=""
            value={tool.url}
            onChange={(e) => console.log(e.target.value)}
          />
          <Textarea
            placeholder=""
            value={tool.description}
            onChange={(e) => console.log(e.target.value)}
          />
          <div className="flex flex-col w-full gap-2">
            <p>Catégorie</p>
            <div>
              <CategoryCombobox tooId={tool.id} getCategoryId={getCategoryId} />{" "}
              <Button onClick={addCategory}>Ajouter</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories?.map((item: any) => (
                <div
                  key={item.categoryId}
                  className="bg-green-500 rounded-full py-1 px-2 flex items-center justify-center gap-3"
                >
                  <p className="text-white">{item.category.name}</p>{" "}
                  <button className="text-red-500 font-bold">X</button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 w-full">
            Publié <Switch value={"on"} />
          </div>
          <Button className="w-full">Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
