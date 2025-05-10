import axios from "axios";
import { CategoryType, getCategoryType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Fetch all categories with pagination
 * @param page - The page number to fetch
 * @param limit - The number of categories per page
 * @returns The categories data with pagination info
 */
export const getCategories = async (
  page: number = 1, 
  limit: number = 10
): Promise<getCategoryType> => {
  try {
    const response = await axios.get(`${API_URL}/api/categories?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Fetch a single category by its ID
 * @param id - The ID of the category to fetch
 * @returns The category data
 */
export const getCategoryById = async (id: number): Promise<CategoryType> => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};

/**
 * Fetch all tools associated with a category
 * @param categoryId - The ID of the category
 * @returns The tools associated with the category
 */
export const getToolsByCategory = async (categoryId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/${categoryId}/tools`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tools by category:", error);
    throw error;
  }
};
