import express from "express";
import "dotenv/config";
import { getNotification } from "../controllers/notification.js";

const router = express.Router();

//GET NOTIFICATION
router.get("/api/catalogs", getNotification);

export default router;
