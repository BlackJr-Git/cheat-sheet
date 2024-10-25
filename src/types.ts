export type ToolType = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  published: boolean;
  userLikes : number[];
  categories: string[];
};

export type getToolsType = {
  tools: ToolType[];
  totalTools: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  categories: {
    toolId: number;
    categoryId: number;
    category: { id: number; name: string; icon: string };
  }[];
};

export type CategoryType = {
  id: number;
  name: string;
  icon: string;
  tools : [];
};

export type getCategoryType = {
  categories: {
    id: number;
    name: string;
    icon: string;
  }[];
  totalCategories: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};

export type userType = {
  id: number;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};
