import axios from "axios";
import { userType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Fetch the current user's profile
 * @returns The user data
 */
export const getCurrentUser = async (): Promise<userType> => {
  try {
    const response = await axios.get(`${API_URL}/api/user/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

/**
 * Like a tool
 * @param toolId - The ID of the tool to like
 * @returns Success message
 */
export const likeTool = async (toolId: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/like`, { toolId });
    return response.data;
  } catch (error) {
    console.error("Error liking tool:", error);
    throw error;
  }
};

/**
 * Unlike a tool
 * @param toolId - The ID of the tool to unlike
 * @returns Success message
 */
export const unlikeTool = async (toolId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/user/like/${toolId}`);
    return response.data;
  } catch (error) {
    console.error("Error unliking tool:", error);
    throw error;
  }
};

/**
 * Bookmark a tool
 * @param toolId - The ID of the tool to bookmark
 * @returns Success message
 */
export const bookmarkTool = async (toolId: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/bookmark`, { toolId });
    return response.data;
  } catch (error) {
    console.error("Error bookmarking tool:", error);
    throw error;
  }
};

/**
 * Remove a bookmark
 * @param toolId - The ID of the tool to remove from bookmarks
 * @returns Success message
 */
export const removeBookmark = async (toolId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/user/bookmark/${toolId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};
