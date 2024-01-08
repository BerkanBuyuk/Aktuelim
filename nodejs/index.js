import express from "express";
import mysql from "mysql";
import "dotenv/config";

const app = express();
const localPort = 8800;

const db = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: "root",
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  port: `${process.env.PORT}`,
  insecureAuth: true,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello welcome Backend DENEMESİ!");
});

//--------------------------------------------------------------------------------------------

////GET MARKETS
app.get("/api/markets", (req, res) => {
  const q = `${process.env.GET_MARKETS_QUERY}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//POST MARKETS
app.post("/api/markets", (req, res) => {
  const q = `${process.env.POST_MARKETS_QUERY}`;
  const values = [
    req.body.market_id,
    req.body.market_name,
    req.body.market_image,
    req.body_category_id,
  ];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post işlemleri başarılı.");
  });
});

app.listen(localPort, () => {
  console.log(`Sunucu ${localPort} portunda çalışıyor.`);
});

//--------------------------------------------------------------------------------------------

//GET CATALOGS
app.get("/api/catalogs", (req, res) => {
  const q = `${process.env.GET_CATALOGS_QUERY}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//POST CATALOGS
app.post("/api/catalogs", (req, res) => {
  const {
    catalog_id,
    catalog_title,
    catalog_image,
    catalog_description,
    market_id,
  } = req.body;

  const sql = `${process.env.POST_CATALOGS_QUERY}`;
  db.query(
    sql,
    [catalog_id, catalog_title, catalog_image, catalog_description, market_id],
    (err, result) => {
      if (err) {
        res.status(500).send("Sorgu hatası");
      } else {
        res.status(200).send("Yeni katalog başarıyla eklendi.");
      }
    }
  );
});

//--------------------------------------------------------------------------------------------

//GET FAVORITES
app.get("/api/favorites", (req, res) => {
  const q = `${process.env.GET_FAVORITES_QUERY}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//--------------------------------------------------------------------------------------------

//POST FAVORITES
app.post("/api/favorites", (req, res) => {
  const { favori_id, catalog_id } = req.body;

  const sql = `${process.env.POST_FAVORITES_QUERY}`;

  db.query(sql, [favori_id, catalog_id], (err, result) => {
    if (err) {
      res.status(500).send("Sorgu hatası");
    } else {
      res.status(200).send("Yeni favori katalog başarıyla eklendi.");
    }
  });
});

//--------------------------------------------------------------------------------------------

//GET CATEGORIES
app.get("/api/categories", (req, res) => {
  const q = `${process.env.GET_CATEGORIES_QUERY}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//--------------------------------------------------------------------------------------------
