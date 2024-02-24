import { create } from "zustand";
import { User } from "../types";

type AuthStore = {
  token: string | null | undefined;
  user: User | null;
  theme: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setTheme: (theme: string | null) => void;
  appendToCart: (id: string) => void;
  clearCart: () => void;
  appendToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  user: null,
  theme: "dark",
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearCart: () => {
    //@ts-ignore
    set((state) => ({
      user: {
        ...state.user,
        cart: [],
      },
    }));
  },
  appendToCart: (id) => {
    //@ts-ignore
    set((state) => ({
      user: {
        ...state.user,
        //@ts-ignore
        cart: [...state.user?.cart, id],
      },
    }));
  },
  appendToWishlist: (id) => {
    //@ts-ignore
    set((state) => ({
      user: {
        ...state.user,
        wishlist: [...state.user?.wishlist, id],
      },
    }));
  },
  removeFromWishlist: (id) => {
    //@ts-ignore
    set((state) => ({
      user: {
        ...state.user,
        wishlist: state.user?.wishlist.filter((item) => item !== id),
      },
    }));
  },
  setTheme: (theme) => {
    set({ theme });
    // set theme to localstorage when switched
    if (theme) {
      localStorage.theme = theme;
    }
  },
}));

export default useAuthStore;
