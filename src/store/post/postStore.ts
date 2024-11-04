import { create } from "zustand";

interface PostState {
  title: string;
  content: string;
  images: File[];
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImages: (images: File[]) => void;
  reset: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  images: [],
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImages: (images) => set({ images }),
  reset: () => set({ title: "", content: "", images: [] }),
}));
