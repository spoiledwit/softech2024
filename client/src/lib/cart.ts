import axios from "axios";

export const addToCart = async (cartItem: any) => {
  const res = await axios.post("/api/cart", cartItem);
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