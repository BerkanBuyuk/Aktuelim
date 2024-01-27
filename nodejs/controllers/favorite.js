import "dotenv/config";
import { db } from "../connect.js";

export const getFavorite = (req, res) => {
  const q = process.env.GET_FAVORITES_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const postFavorite = (req, res) => {
  const { favori_id, catalog_id } = req.body;

  const sql = process.env.POST_FAVORITES_QUERY;

  db.query(sql, [favori_id, catalog_id], (err, result) => {
    if (err) {
      res.status(500).send("Sorgu hatası");
    } else {
      res.status(200).send("Yeni favori katalog başarıyla eklendi.");
    }
  });
};

export const deleteFavorite = (req, res) => {
  const favoriId = req.params.id;
  const q = process.env.DELETE_FAVORITES_QUERY;

  db.query(q, [favoriId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Favori ID: ${favoriId} Silme Başarılı.`);
  });
};
