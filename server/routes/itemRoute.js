import { createItem, getItems, getItem, getItemByBusiness } from "../controllers/Item.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();


router.get("/", getItems);
router.get("/:id", getItem);
router.get("/business/:businessId", getItemByBusiness);
router.post("/", verifyToken, createItem);
// router.post("/review", verifyToken, addReview);

export default router;