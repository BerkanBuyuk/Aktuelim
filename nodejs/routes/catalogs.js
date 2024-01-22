import express from "express";
import "dotenv/config";
import {
  deleteCatalog,
  getCatalog,
  postCatalog,
  putCatalog,
} from "../controllers/catalog.js";

const router = express.Router();

//GET CATALOGS
router.get("/api/catalogs", getCatalog);

//POST CATALOGS
router.post("/api/catalogs", postCatalog);

//DELETE CATALOGS
router.delete("/api/catalogs/:id", deleteCatalog);

//PUT CATALOGS
router.put("/api/catalogs/:id", putCatalog);

export default router;
