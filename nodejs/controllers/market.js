import "dotenv/config";
import { db } from "../connect.js";

export const getMarket = (req, res) => {
  const q = process.env.GET_MARKETS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const postMarket = (req, res) => {
  const q = process.env.POST_MARKETS_QUERY;
  const values = [
    req.body.market_id,
    req.body.market_name,
    req.body.market_image,
    req.body.category_id,
  ];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post işlemleri başarılı.");
  });
};
