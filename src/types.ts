export type ToolType = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  published: boolean;
  userLikes : number[];
  //   categories: string[];
};

export type getToolsType = {
  tools: ToolType[];
  totalTools: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};

export type CategoryType = {
  id: number;
  name: string;
  icon: string;
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
