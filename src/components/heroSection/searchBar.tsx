// app/components/SearchBar.jsx
"use client";

import { useState, useEffect } from "react";
import { searchCategories } from "./searchActions";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
// import { CategoryType } from "@/types";
import { Card } from "../ui/card";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type CategoryType = {
  id: number;
  name: string;
  icon: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm();
  const watchedQuery = watch("query");

  // Fonction qui sera appelée à chaque changement
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (watchedQuery) {
        setLoading(true);
        setQuery(watchedQuery);
        console.log("Input changed:", watchedQuery);
        const categories = await searchCategories(watchedQuery);
        setResults(categories);
        console.log(categories);
        setLoading(false);
      } else {
        setResults([]); // Clear results if the query is empty
      }
    }, 300); // Délai de 300 ms

    return () => clearTimeout(delayDebounceFn); // Nettoyer le timeout à chaque changement
  }, [watchedQuery]); // Déclenche à chaque fois que `watchedQuery` change

  return (
    <div className="md:w-1/2 w-full">
      <Input
        className="h-12"
        placeholder="Rechercher par category"
        // onChange={(e) => setQuery(e.target.value)}
        {...register("query")}
      />
      {watchedQuery !== "" ? (
        <Card className="mt-2 flex flex-col gap-2 max-h-64 overflow-y-scroll p-4">
          {results.map((category) => (
            <Link
              className="hover:bg-violet-200 px-4 py-2 rounded-3xl flex items-center justify-between"
              href={`/categories/${category.id}`}
              key={category.id}
            >
              <div className="flex gap-2 items-center">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <ArrowRightIcon className="text-violet-500 w-6 h-6" />
            </Link>
          ))}
          {!loading && query !== "" && results.length === 0 ? (
            <p>Aucun resultat ne correspondant</p>
          ) : (
            <></>
          )}
          {loading ? <p>Loading...</p> : <></>}
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}
