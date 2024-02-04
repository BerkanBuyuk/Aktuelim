import mysql from "mysql";
import "dotenv/config";

export const db = mysql.createConnection({
  host: "bdsz1fcgfjmpymaiymr9-mysql.services.clever-cloud.com",
  database: "bdsz1fcgfjmpymaiymr9",
  user: "ulcbew6yepkrndxs",
  password: "F0TAxDDv8BY9g9ECiQC6",
  port: 3306,
});
