import express from "express";
import "dotenv/config";
import { getNotification } from "../controllers/notification.js";

const router = express.Router();

//POST NOTIFICATION
router.post("/api/send-notification", getNotification);

export default router;
