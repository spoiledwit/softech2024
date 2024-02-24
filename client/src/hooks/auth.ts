// auth.ts
import axios from "axios";

export const login = async (email: string, password: string) => {
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/login`, { email, password });
    localStorage.setItem("token", data.token);
    return data;
};

export const register = async (name: string, email: string, password: string, birthday?:string, state?: string, country?:string, postalCode?:string, phoneNumber?:string, address?:string, city?:string) => {
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/register`, { name, email, password, birthday, state, country, postalCode, phoneNumber, address, city });
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    return null;
};

export const loginBack = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URI}/auth/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return { user: data, token };
};
