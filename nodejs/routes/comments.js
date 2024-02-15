import express from "express";
import "dotenv/config";
import {
  getComment,
  postComment,
  deleteComment,
} from "../controllers/comment.js";

const router = express.Router();

//GET COMMENTS
router.get("/api/comments", getComment);

//POST CATALOGS
router.post("/api/comments", postComment);

//DELETE CATALOGS
router.delete("/api/comments/:id", deleteComment);

export default router;
