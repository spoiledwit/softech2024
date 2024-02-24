import { create } from "zustand";
import { User } from "../types";

type AuthStore = {
    token: string | null | undefined;
    user: User | null;
    theme: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setTheme: (theme: string | null) => void,
    cart: any | null;
    appendToCart: (item: any) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    token: "",
    user: null,
    theme: "dark",
    cart: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    appendToCart: (item) => {
        set((state) => {
            return {
                cart: [...state.cart, item],
            };
        });
    }
    ,
    setTheme: (theme) => {
        set({ theme });
        // set theme to localstorage when switched
        if (theme) {
            localStorage.theme = theme;
        }
    },
}));

export default useAuthStore;