import {
    createComplaint,
    deleteComplaint,
    getComplaintsByBusiness,
    getComplaintsByUser,
    analytics
} from "../controllers/complaint.js"

import express from "express"
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()

router.post("/", verifyToken, createComplaint)
router.get("/", verifyToken, getComplaintsByUser)
router.delete("/:id", verifyToken, deleteComplaint)
router.get("/analytics/:id", verifyToken, analytics)
router.get("/:id", verifyToken, getComplaintsByBusiness)

export default router;