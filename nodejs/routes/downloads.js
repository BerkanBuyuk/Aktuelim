import express from "express";
import "dotenv/config";
import {
  getDownload,
  postDownload,
  deleteDownload,
} from "../controllers/download.js";

const router = express.Router();

//GET DOWNLOADS
router.get("/api/downloads", getDownload);

//POST DOWNLOADS
router.post("/api/downloads", postDownload);

//DELETE DOWNLOADS
router.delete("/api/downloads/:id", deleteDownload);

export default router;
