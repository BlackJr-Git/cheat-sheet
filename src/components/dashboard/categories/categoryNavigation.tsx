import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddCategory from "./addCategory";
// import FilterSelect from "./filterSelect";
// import CategorySelect from "./categorySelect";

export default function CategoryNavigation() {
  return (
    <nav className="flex items-center justify-between rounded-xl w-full gap-4 bg-slate-100 p-4">
      <div className="w-full">
        <Input />
      </div>
      <div>{/* <FilterSelect /> */}</div>
      <div>{/* <CategorySelect /> */}</div>
      <div className="w-full">
        <AddCategory />
      </div>
    </nav>
  );
}
