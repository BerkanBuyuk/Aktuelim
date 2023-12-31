import express from "express";
import mysql from "mysql";

const app = express();
const port = 8800;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "berkanbuyuk",
  database: "aktuel",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello welcome Backend!");
});

app.get("/api", (req, res) => {
  const q = "SELECT * FROM Markets";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/api", (req, res) => {
  const q =
    "INSERT INTO Markets (`market_id`, `market_name`, `market_image`) VALUES (?)";
  const values = [
    req.body.market_id,
    req.body.market_name,
    req.body.market_image,
  ];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post işlemleri başarılı.");
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
