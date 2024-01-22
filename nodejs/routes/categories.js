import express from "express";
import "dotenv/config";
import { getCategory } from "../controllers/category.js";

const router = express.Router();

//GET CATEGORIES
router.get("/api/categories", getCategory);

export default router;
