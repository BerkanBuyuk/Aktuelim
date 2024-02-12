import "dotenv/config";
import { db } from "../connect.js";

export const getDownload = (req, res) => {
  const q = process.env.GET_DOWNLOADS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const postDownload = (req, res) => {
  const { download_id, catalog_id } = req.body;

  const sql = process.env.POST_DOWNLOADS_QUERY;

  db.query(sql, [download_id, catalog_id], (err, result) => {
    if (err) {
      res.status(500).send("Sorgu hatası");
    } else {
      res.status(200).send("Yeni download katalog başarıyla eklendi.");
    }
  });
};

export const deleteDownload = (req, res) => {
  const donwloadId = req.params.id;
  const q = process.env.DELETE_DOWNLOADS_QUERY;

  db.query(q, [donwloadId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Download ID: ${donwloadId} Silme Başarılı.`);
  });
};
