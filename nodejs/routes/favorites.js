import express from "express";
import "dotenv/config";
import { getFavorite, postFavorite } from "../controllers/favorite.js";

const router = express.Router();

//GET FAVORITES
router.get("/api/favorites", getFavorite);

//POST FAVORITES
router.post("/api/favorites", postFavorite);

export default router;
