import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/api/auth/login", login);
router.post("/api/auth/register", register);
router.post("/api/auth/logout", logout);

export default router;
