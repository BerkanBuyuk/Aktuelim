import mysql from "mysql";
import "dotenv/config";

export const db = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
