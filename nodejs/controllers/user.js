import "dotenv/config";
import { db } from "../connect.js";

export const getAllUser = (req, res) => {
  const q = process.env.GET_USERS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getUser = (req, res) => {
  const id = req.body.user_id;
  console.log(typeof id);
  const q = `${process.env.GET_USER_QUERY}${id}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

//getUser Post yapılacak.
//async storage user_role tut
