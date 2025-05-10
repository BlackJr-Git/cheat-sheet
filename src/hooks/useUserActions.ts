"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getCurrentUser, 
  likeTool, 
  unlikeTool, 
  bookmarkTool, 
  removeBookmark 
} from "@/services/api";

/**
 * Hook to fetch the current user's profile
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};

/**
 * Hook to like a tool
 */
export const useLikeTool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likeTool,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
};

/**
 * Hook to unlike a tool
 */
export const useUnlikeTool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: unlikeTool,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
};

/**
 * Hook to bookmark a tool
 */
export const useBookmarkTool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookmarkTool,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};

/**
 * Hook to remove a bookmark
 */
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeBookmark,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};
