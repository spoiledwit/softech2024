import { login, register, getUser, forgotPassword, appendToWishlist, removeFromWishlist, updateUser, getWishlist } from "../controllers/Auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/", verifyToken, updateUser)
router.put("/forgot", forgotPassword);
router.get("/user", verifyToken, getUser);
router.get("/wishlist", verifyToken, getWishlist);
router.post("/wishlist/append/:itemId", verifyToken, appendToWishlist);
router.post("/wishlist/remove/:itemId", verifyToken, removeFromWishlist);

export default router;