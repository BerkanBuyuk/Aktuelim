import "dotenv/config";
import { db } from "../connect.js";

export const getAllUser = (req, res) => {
  const q = process.env.GET_USERS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getUserById = (req, res) => {
  const userId = req.params.id;

  const q = process.env.GET_USER_QUERY;

  db.query(q, userId, (err, data) => {
    if (err) return res.status(500).json({ error: "Veritabanı hatası" });
    if (data.length === 0)
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    return res.json(data[0]);
  });
};

export const putUser = (req, res) => {
  const userId = req.params.id;
  const q = process.env.PUT_USER_QUERY;

  const values = [
    req.body.user_id,
    req.body.user_username,
    req.body.user_name,
    req.body.user_pic,
  ];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`User ID: ${userId} Güncellendi.`);
  });
};
