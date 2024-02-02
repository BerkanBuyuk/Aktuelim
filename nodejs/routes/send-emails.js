import express from "express";
import "dotenv/config";
import { postMail } from "../controllers/send-email.js";

const router = express.Router();

//POST MAILS
router.post("/api/send-email", postMail);

export default router;
