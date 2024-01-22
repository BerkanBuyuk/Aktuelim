import "dotenv/config";
import { db } from "../connect.js";

export const getCategory = (req, res) => {
  const q = process.env.GET_CATEGORIES_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
