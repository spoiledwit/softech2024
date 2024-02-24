import { createItem, getItems, getItem } from "../controllers/Item.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();


router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", verifyToken, createItem);

export default router;