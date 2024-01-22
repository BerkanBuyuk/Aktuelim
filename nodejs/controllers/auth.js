import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const register = (req, res) => {
  const q = process.env.GET_USERS_QUERY;

  db.query(q, [req.body.user_username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Kullanıcı zaten var!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.user_password, salt);

    const q = process.env.POST_USERS_QUERY;

    const values = [
      req.body.user_username,
      req.body.user_email,
      hashedPassword,
      req.body.user_name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Kullanıcı Oluşturuldu.");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
