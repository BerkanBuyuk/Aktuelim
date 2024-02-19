import mysql from "mysql";
import "dotenv/config";

export const db = mysql.createConnection({
  host: process.env.HOST2,
  database: process.env.DATABASE2,
  user: process.env.USER2,
  password: process.env.PASSWORD2,
  port: 3306,
});
