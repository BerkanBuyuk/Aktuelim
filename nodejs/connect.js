import mysql from "mysql";
import "dotenv/config";

export const db = mysql.createConnection({
  // host: `${process.env.HOST}`,
  host: "bdsz1fcgfjmpymaiymr9-mysql.services.clever-cloud.com",
  user: "ulcbew6yepkrndxs",
  // password: `${process.env.PASSWORD}`,
  password: "F0TAxDDv8BY9g9ECiQC6",
  // database: `${process.env.DATABASE}`,
  database: "bdsz1fcgfjmpymaiymr9",
  // port: `${process.env.PORT}`,
  port: 3306,
});
