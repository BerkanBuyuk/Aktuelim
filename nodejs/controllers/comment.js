import "dotenv/config";
import { db } from "../connect.js";

//GET COMMENT
export const getComment = (req, res) => {
  const q = process.env.GET_COMMENTS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

//POST COMMENT
export const postComment = (req, res) => {
  const {
    comment_id,
    description,
    user_pic,
    user_name,
    comment_created_at,
    catalog_id,
  } = req.body;

  const sql = process.env.POST_COMMENTS_QUERY;
  db.query(
    sql,
    [
      comment_id,
      description,
      user_pic,
      user_name,
      comment_created_at,
      catalog_id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Sorgu hatası");
      } else {
        res.status(200).send(`Yeni katalog başarıyla eklendi.`);
      }
    }
  );
};

//DELETE COMMENT
export const deleteComment = (req, res) => {
  const commentId = req.params.id;
  const q = process.env.DELETE_COMMENTS_QUERY;

  db.query(q, [commentId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Katalog ID: ${commentId} Silme Başarılı.`);
  });
};
