import {
    createComplaint,
    deleteComplaint,
    getComplaintsByBusiness,
    getComplaintsByUser
} from "../controllers/complaint.js"

import express from "express"
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()

router.post("/", verifyToken, createComplaint)
router.get("/", verifyToken, getComplaintsByUser)
router.delete("/", verifyToken, deleteComplaint)
router.get("/:id", verifyToken, getComplaintsByBusiness)

export default router;