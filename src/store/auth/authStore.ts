import { create } from "zustand";

export interface AuthState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  message: string;
  isLoggedIn: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setDisplayName: (displayName: string) => void;
  setMessage: (message: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
  message: "",
  isLoggedIn: false,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setDisplayName: (displayName) => set({ displayName }),
  setMessage: (message) => set({ message }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  reset: () =>
    set({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      message: "",
      isLoggedIn: false,
    }),
}));
