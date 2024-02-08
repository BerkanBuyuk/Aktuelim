import express from "express";
import { getAllUser } from "../controllers/user.js";

const router = express.Router();

router.get("/api/users", getAllUser);

export default router;
