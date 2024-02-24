import { createItem, getItems, getItem, getItemByBusiness, addReview, updateReview, deleteReview, analytics } from "../controllers/Item.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();


router.get("/", getItems);
router.get("/:id", getItem);
router.get("/analytics", verifyToken, analytics);
router.get("/business/:businessId", getItemByBusiness);
router.post("/", verifyToken, createItem);
router.post("/review", verifyToken, addReview);
router.patch("/review/:itemId", verifyToken, updateReview);
router.delete("/review/:itemId", verifyToken, deleteReview);

export default router;