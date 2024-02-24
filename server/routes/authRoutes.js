import { login, register, getUser, forgotPassword } from "../controllers/Auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/forgot", forgotPassword);
router.get("/user", verifyToken, getUser);

export default router;