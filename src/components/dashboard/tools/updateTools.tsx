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
import { PlusIcon, XCircleIcon , ArrowPathIcon} from "@heroicons/react/24/outline";

export default function UpdateToolsDialog({ tool }: { tool: any }) {
  const [categories, setCategories] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

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
    // if (categories.includes(addedCategory.categoryId)) {

    // }
    if (addedCategory.categoryId) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tools/tool-category`,
          addedCategory
        );

        if (response.status === 200) {
          const category = {
            toolId: tool.id,
            categoryId: addedCategory.categoryId,
            category: response.data.category,
          };
          setCategories([...categories, category]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-full p-2 hover:bg-violet-200 cursor-pointer bg-violet-400 w-full">
        Modifier
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-scroll scrollbar-hide">
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
            className="rounded-xl"
          />
          <Input
            placeholder=""
            value={tool.url}
            onChange={(e) => console.log(e.target.value)}
            className="rounded-xl"
          />
          <Textarea
            placeholder=""
            value={tool.description}
            onChange={(e) => console.log(e.target.value)}
            className=""
          />
          <div className="flex flex-col w-full gap-2">
            <p>Catégorie</p>

            <div className="flex flex-wrap gap-2">
              {categories?.map((item: any) => (
                <div
                  key={item.categoryId}
                  className="bg-violet-500 rounded-full py-1 px-2 flex items-center justify-center gap-3"
                >
                  <p className="text-white">{item?.category?.name}</p>{" "}
                  <button className="text-white font-bold p-1">
                    {" "}
                    <XCircleIcon className="w-4 h-4 hover:text-red-500 " />{" "}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center mt-2">
              <CategoryCombobox tooId={tool.id} getCategoryId={getCategoryId} />{" "}
              {loading ? (
                <ArrowPathIcon className="w-6 h-6 animate-spin text-violet-500" />
              ) : (
                <PlusIcon
                  onClick={addCategory}
                  className="w-8 h-8 text-violet-500 cursor-pointer border-2 border-violet-500 p-1 rounded-full"
                />
              )}
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
