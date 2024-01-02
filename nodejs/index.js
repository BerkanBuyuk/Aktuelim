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
    "INSERT INTO Markets (`market_id`, `market_name`, `market_image`) VALUES (?, ?, ?)";
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

//------------------------------------------------------------

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

// //NEW GET CATALOGS WITH MARKET INFO
// app.get("/api", (req, res) => {
//   const q =
//     "SELECT Catalogs.*, Markets.market_id as market_id, Markets.market_name, Markets.market_image FROM Catalogs JOIN Markets ON Catalogs.market_id = Markets.market_id";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);

//     const formattedData = data.map((catalog) => {
//       return {
//         catalog_id: catalog.catalog_id,
//         catalog_title: catalog.catalog_title,
//         catalog_image: catalog.catalog_image,
//         catalog_description: catalog.catalog_description,
//         market: {
//           market_id: catalog.market_id,
//           market_name: catalog.market_name,
//           market_image: catalog.market_image,
//         },
//       };
//     });

//     return res.json(formattedData);
//   });
// });

// //NEW POST CATALOGS
// app.post("/api", (req, res) => {
//   const {
//     catalog_id,
//     catalog_title,
//     catalog_image,
//     catalog_description,
//     market_id,
//   } = req.body;

//   const sql =
//     "INSERT INTO Catalogs (catalog_id, catalog_title, catalog_image, catalog_description, market_id) VALUES (?, ?, ?, ?, ?)";

//   db.query(
//     sql,
//     [catalog_id, catalog_title, catalog_image, catalog_description, market_id],
//     (err, result) => {
//       if (err) {
//         res.status(500).send("Sorgu hatası");
//       } else {
//         res.status(200).send("Yeni katalog başarıyla eklendi.");
//       }
//     }
//   );
// });
