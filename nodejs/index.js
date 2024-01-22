import express from "express";
import marketsRoutes from "./routes/markets.js";
import categoriesRoutes from "./routes/categories.js";
import favoritesRoutes from "./routes/favorites.js";
import catalogsRoutes from "./routes/catalogs.js";

const app = express();
const localPort = 8800;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Backend'e hoşgeldin. Kırmızı hap mı mavi hap mı istersin ?");
});

//--------------------------------------------------------------------------------------------

app.use("/", marketsRoutes);
app.use("/", categoriesRoutes);
app.use("/", favoritesRoutes);
app.use("/", catalogsRoutes);

app.listen(localPort, () => {
  console.log(`Sunucu ${localPort} portunda çalışıyor.`);
});

//--------------------------------------------------------------------------------------------
