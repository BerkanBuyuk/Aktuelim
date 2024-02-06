import "dotenv/config";
import { db } from "../connect.js";

export const getUser = (req, res) => {
  const q = process.env.GET_USERS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
