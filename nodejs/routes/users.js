import express from "express";
import { getAllUser, getUserById, putUser } from "../controllers/user.js";

const router = express.Router();

router.get("/api/users", getAllUser);
router.get("/api/users/:id", getUserById);
router.put("/api/users/:id", putUser);

export default router;
