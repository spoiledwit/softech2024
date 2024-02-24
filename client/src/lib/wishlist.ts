import axios from "axios";

export const appendToServerWishlist = async (productId: string) => {
  try {
    const res = await axios.post("/api/wishlist", { productId });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const removeFromServerWishlist = async (productId: string) => {
  try {
    const res = await axios.delete(`/api/wishlist`, { data: { productId } });
    return res.data;
  } catch (error) {
    return error;
  }
};
