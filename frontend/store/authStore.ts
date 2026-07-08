import { create } from "zustand";
import { User } from "@/types/user.types";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;

  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isLoading: true,

  setAccessToken: (accessToken) =>
    set({ accessToken }),

  setUser: (user) =>
    set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
    }),

  setLoading: (isLoading) =>
    set({ isLoading }),
}));