"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTools, getToolBySlug, getToolsByCategoryId } from "@/services/api";

/**
 * Hook to fetch all tools with pagination
 */
export const useTools = (page: number = 1, limit: number = 10, orderby: string = 'desc') => {
  return useQuery({
    queryKey: ["tools", page, limit, orderby],
    queryFn: () => getTools(page, limit, orderby),
  });
};

/**
 * Hook to fetch a single tool by slug
 */
export const useTool = (slug: string) => {
  return useQuery({
    queryKey: ["tool", slug],
    queryFn: () => getToolBySlug(slug),
    enabled: !!slug,
  });
};

/**
 * Hook to fetch tools by category
 */
export const useToolsByCategory = (categoryId: number, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["tools", "category", categoryId, page, limit],
    queryFn: () => getToolsByCategoryId(categoryId, page, limit),
    enabled: !!categoryId,
  });
};
