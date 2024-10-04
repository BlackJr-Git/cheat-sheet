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

export default function FilterSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filtres</SelectLabel>
          <SelectItem value="published">Publie</SelectItem>
          <SelectItem value="non-published">Non Publie</SelectItem>
          <SelectItem value="recents">Recents</SelectItem>
          {/* <SelectItem value="grapes"></SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
