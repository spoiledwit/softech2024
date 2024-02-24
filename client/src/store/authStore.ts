/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  toggleWishlist: (id: string) => void;
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
        // eslint-disable-next-line no-unsafe-optional-chaining
        cart: [...state.user?.cart, id],
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
  toggleWishlist: (id: string) => {
    set((state: any) => ({
      user: {
        ...state.user,
        wishlist: state.user?.wishlist.includes(id)
          ? state.user?.wishlist.filter((item: any) => item !== id)
          : // eslint-disable-next-line no-unsafe-optional-chaining
            [...state.user?.wishlist, id],
      },
    }));
  },
}));

export default useAuthStore;
