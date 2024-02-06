import express from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router();

router.get("/api/users", getUser);

export default router;
