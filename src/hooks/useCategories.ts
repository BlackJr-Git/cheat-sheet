"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "@/services/api";

/**
 * Hook to fetch all categories with pagination
 */
export const useCategories = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories(page, limit),
  });
};

/**
 * Hook to fetch a single category by ID
 */
export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
