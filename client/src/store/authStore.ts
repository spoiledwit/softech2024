import { create } from "zustand";
import { User } from "../types";

type AuthStore = {
    token: string | null | undefined;
    user: User | null;
    theme: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setTheme: (theme: string | null) => void,
};

const useAuthStore = create<AuthStore>((set) => ({
    token: "",
    user: null,
    theme: "dark",
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setTheme: (theme) => {
        set({ theme });
        // set theme to localstorage when switched
        if (theme) {
            localStorage.theme = theme;
        }
    },
}));

export default useAuthStore;