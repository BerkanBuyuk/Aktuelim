import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = process.env.REGISTER_GET_USERS_QUERY;

  db.query(q, [req.body.user_username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Kullanıcı zaten var!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.user_password, salt);

    const q = process.env.REGISTER_POST_USERS_QUERY;

    const values = [
      req.body.user_username,
      req.body.user_email,
      hashedPassword,
      req.body.user_name,
      req.body.user_pic,
      req.body.user_phone,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Kullanıcı Oluşturulduu.");
    });
  });
};

export const login = (req, res) => {
  const q = process.env.LOGIN_GET_USERS_QUERY;
  db.query(q, [req.body.user_username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Kullanıcı Bulunamadı !");

    const checkPassword = bcrypt.compareSync(
      req.body.user_password,
      data[0].user_password
    );
    if (!checkPassword)
      return res.status(400).json("Yanlış Kullanıcı Adı veya Şifre !");

    const token = jwt.sign({ id: data[0].user_id }, "secretkey");

    const { user_password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Kullanıcının oturumu kapatıldı.");
};
