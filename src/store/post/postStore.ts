import { create } from "zustand";

interface PostState {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  reset: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  reset: () => set({ title: "", content: "" }),
}));
