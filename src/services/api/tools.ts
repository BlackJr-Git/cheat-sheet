import axios from "axios";
import { ToolType, getToolsType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Fetch a single tool by its slug
 * @param slug - The slug of the tool to fetch
 * @returns The tool data
 */
export const getToolBySlug = async (slug: string): Promise<ToolType> => {
  try {
    const response = await axios.get(`${API_URL}/api/tools/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tool by slug:", error);
    throw error;
  }
};

/**
 * Fetch all tools with pagination
 * @param page - The page number to fetch
 * @param limit - The number of tools per page
 * @param orderby - Optional order direction (asc or desc)
 * @returns The tools data with pagination info
 */
export const getTools = async (page: number = 1, limit: number = 10, orderby: string = 'desc'): Promise<getToolsType> => {
  try {
    // Using the correct query parameters (pages and number) to match the API implementation
    const response = await axios.get(`${API_URL}/api/tools?pages=${page}&number=${limit}&orderby=${orderby}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tools:", error);
    throw error;
  }
};

/**
 * Fetch tools by category
 * @param categoryId - The ID of the category to filter by
 * @param page - The page number to fetch
 * @param limit - The number of tools per page
 * @returns The tools data with pagination info
 */
export const getToolsByCategory = async (
  categoryId: number, 
  page: number = 1, 
  limit: number = 10
): Promise<getToolsType> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/tools/category/${categoryId}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tools by category:", error);
    throw error;
  }
};
