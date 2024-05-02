import express from "express";
import { login, register, logout, verifyEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.put("/verify/:token", verifyEmail);

export default router;
