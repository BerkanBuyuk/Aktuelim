import express from "express";
import { getUser, putUser } from "../controllers/user.js";

const router = express.Router();

router.get("/api/user", getUser);
router.put("/api/user/:id", putUser);

export default router;
