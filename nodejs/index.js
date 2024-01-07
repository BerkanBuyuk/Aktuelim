import express from "express";
import mysql from "mysql";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

const db = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: "root",
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello welcome Backend!");
});

//--------------------------------------------------------------------------------------------

////GET MARKETS
app.get("/api/markets", (req, res) => {
  const q = "SELECT * FROM Markets";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//POST MARKETS
app.post("/api/markets", (req, res) => {
  const q =
    "INSERT INTO Markets (`market_id`, `market_name`, `market_image`, `category_id`) VALUES (?, ?, ?)";
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

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});

//--------------------------------------------------------------------------------------------

//GET CATALOGS
app.get("/api/catalogs", (req, res) => {
  const q = "SELECT * FROM Catalogs";
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

  const sql =
    "INSERT INTO Catalogs (catalog_id, catalog_title, catalog_image, catalog_description, market_id) VALUES (?, ?, ?, ?, ?)";

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
  const q = "SELECT * FROM Favorites";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//--------------------------------------------------------------------------------------------

//POST FAVORITES
app.post("/api/favorites", (req, res) => {
  const { favori_id, catalog_id } = req.body;

  const sql = "INSERT INTO Favorites (favori_id, catalog_id) VALUES (?, ?)";

  db.query(sql, [favori_id, catalog_id], (err, result) => {
    if (err) {
      res.status(500).send("Sorgu hatası");
    } else {
      res.status(200).send("Yeni katalog başarıyla eklendi.");
    }
  });
});

//--------------------------------------------------------------------------------------------

//GET CATEGORIES
app.get("/api/categories", (req, res) => {
  const q = "SELECT * FROM Categories";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//--------------------------------------------------------------------------------------------
