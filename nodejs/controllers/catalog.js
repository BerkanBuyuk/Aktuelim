import "dotenv/config";
import { db } from "../connect.js";

//GET CATALOG
export const getCatalog = (req, res) => {
  const q = process.env.GET_CATALOGS_QUERY;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

//POST CATALOG
export const postCatalog = (req, res) => {
  const {
    catalog_id,
    catalog_title,
    catalog_image,
    catalog_description,
    market_id,
  } = req.body;

  const sql = process.env.POST_CATALOGS_QUERY;
  db.query(
    sql,
    [catalog_id, catalog_title, catalog_image, catalog_description, market_id],
    (err, result) => {
      if (err) {
        res.status(500).send("Sorgu hatası");
      } else {
        res.status(200).send(`Yeni katalog başarıyla eklendi.`);
      }
    }
  );
};

//DELETE CATALOG
export const deleteCatalog = (req, res) => {
  const catalogId = req.params.id;
  const q = process.env.DELETE_CATALOGS_QUERY;

  db.query(q, [catalogId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Katalog ID: ${catalogId} Silme Başarılı.`);
  });
};

//PUT CATALOG
export const putCatalog = (req, res) => {
  const catalogId = req.params.id;
  const q = process.env.PUT_CATALOGS_QUERY;

  const values = [
    req.body.catalog_id,
    req.body.catalog_title,
    req.body.catalog_image,
    req.body.catalog_description,
    req.body.market_id,
  ];

  db.query(q, [...values, catalogId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Katalog ID: ${catalogId} Güncellendi.`);
  });
};
