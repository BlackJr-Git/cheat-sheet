import { create } from "zustand";
import { userType } from "./types";


export type StoreType = {
  currentUser: userType | null;
  setCurrentUser: (currentUser: userType) => void;
}

export const useStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: userType) => set({ currentUser }),
}));
