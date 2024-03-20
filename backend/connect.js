require("dotenv0").config();
import mysql from "mysql";

const urlDB = "mysql://root:nrckHamrmWoNPbwPxMYAqXoZxGfsfFOA@roundhouse.proxy.rlwy.net:11389/railway"


export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});




// OLD CODE FOR LOCALHOST

//import mysql from "mysql";

//export const db = mysql.createConnection({
  //host: "localhost",
  //user: "root",
  ////password: "",
  //database: "balaifinder_database",
//});
