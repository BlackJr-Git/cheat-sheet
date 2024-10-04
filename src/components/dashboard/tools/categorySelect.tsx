import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    name: "Dev",
    value: "dev",
  },
  {
    name: "UX",
    value: "ux",
  },
  {
    name: "Photos",
    value: "photos",
  },
  {
    name: "AI",
    value: "ai",
  },
  {
    name: "Developement",
    value: "developement",
  },
];

export default function FilterSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filtres</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
