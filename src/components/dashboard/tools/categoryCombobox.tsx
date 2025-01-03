"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { CategoryType } from "@/types";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryCombobox({
  tooId,
  getCategoryId,
}: {
  tooId: string;
  getCategoryId: any;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const [categories, setCategories] = useState([] as CategoryType[]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/category?number=100&pages=1`
        );
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]); // optionnel, peut-être utile pour afficher un message d'erreur
      }
    }

    getCategories();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((category) => category.name === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    // setCategoryId(category.id);
                    getCategoryId(category.id);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.icon}
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
