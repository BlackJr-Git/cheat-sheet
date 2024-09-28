import { create } from "zustand";
import { userType } from "./types";

export const useStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: userType) => set({ currentUser }),
}));
