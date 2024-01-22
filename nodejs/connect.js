import mysql from "mysql";
import "dotenv/config";

export const db = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: "root",
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  port: `${process.env.PORT}`,
});
