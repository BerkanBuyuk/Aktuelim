import express from "express";
import marketsRoutes from "./routes/markets.js";
import categoriesRoutes from "./routes/categories.js";
import favoritesRoutes from "./routes/favorites.js";
import catalogsRoutes from "./routes/catalogs.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import downloadsRoutes from "./routes/downloads.js";
import sendMails from "./routes/send-emails.js";
import notificationsRoutes from "./routes/notifications.js";
import commentsRoutes from "./routes/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
const app = express();
const localPort = 8800;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Backend'e hoşgeldin. Kırmızı hap mı mavi hap mı istersin ?");
});

//--------------------------------------------------------------------------------------------

app.use("/", marketsRoutes);
app.use("/", categoriesRoutes);
app.use("/", favoritesRoutes);
app.use("/", catalogsRoutes);
app.use("/", authRoutes);
app.use("/", sendMails);
app.use("/", notificationsRoutes);
app.use("/", usersRoutes);
app.use("/", downloadsRoutes);
app.use("/", commentsRoutes);

app.listen(localPort, () => {
  console.log(`Sunucu ${localPort} portunda çalışıyor.`);
});

//--------------------------------------------------------------------------------------------
