import express from "express";
import "dotenv/config";
import { getMarket, postMarket } from "../controllers/market.js";

const router = express.Router();

//GET MARKETS
router.get("/api/markets", getMarket);

//POST MARKETS
router.post("/api/markets", postMarket);

export default router;
