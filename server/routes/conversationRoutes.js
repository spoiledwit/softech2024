import {createConversation, getConversation, getMyConversations} from "../controllers/Conversation.js"
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/", createConversation);
router.get("/:firstUserId/:secondUserId", getConversation);
router.get("/:userId", verifyToken, getMyConversations);

export default router;