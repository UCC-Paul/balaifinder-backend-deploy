



// OLD CODE FOR LOCALHOST

import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "balaifinder_database",
});
