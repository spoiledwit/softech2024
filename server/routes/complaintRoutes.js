import {
    createComplaint,
    deleteComplaint,
    getComplaintsByUser
} from "../controllers/complaint.js"

import express from "express"
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()

router.post("/", verifyToken, createComplaint)
router.get("/", verifyToken, getComplaintsByUser)
router.delete("/", verifyToken, deleteComplaint)

export default router;