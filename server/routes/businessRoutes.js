import {
    createBusiness,
    getBusiness,
    getBusinesses,
    updateBusiness,
    deleteBusiness
} from "../controllers/business"

import verifyToken from "../middlewares/verifyToken.js";
import isBusiness from "../middlewares/isBusiness.js";
import express from "express";

const router = express.Router();

router.post("/", verifyToken, createBusiness);
router.get("/", getBusinesses);
router.get("/:id", getBusiness);
router.patch("/:id", verifyToken, isBusiness, updateBusiness);
router.delete("/:id", verifyToken, isBusiness, deleteBusiness);

export default router;