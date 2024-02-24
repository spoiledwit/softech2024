import axios from "axios";

export const addToCart = async (cartItem: any) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/cart`, cartItem, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return res.data;
};

export const deleteCartItem = async (cartItemId: string) => {
  const res = await axios.delete(`/api/cart`, {
    data: {
      cartItemId,
    },
  });
  return res.data;
};

export const getCart = async () => {
  try {
    const res = await axios.get("/api/cart");
    return res.data;
  } catch (err) {
    return err;
  }
};