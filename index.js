import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./connect.js";

//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

//NEW CORS
app.use(cors());


//app.get('/cors', (req, res) => {
  //res.set('Access-Control-Allow-Origin', '*');
  //res.send({ "msg": "This has CORS enabled 🎈" })
  //})


//OLD CORS FOR LOCALHOSTING

//app.use(
  //cors({
    //origin: "http://localhost:5173",
  //})
//);


app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// -- Main SQL ALGORITHM -- 
app.get("/api/get", (req, res) => {
  const sqlGet = `
  SELECT *,
         (CASE
             WHEN u.type = m.type THEN 2
             WHEN u.location = m.location THEN 3
             WHEN u.price <= m.price * 1.1 AND u.price >= m.price * 0.9 THEN 2
             WHEN TRIM(UPPER(u.isnearschool)) = TRIM(UPPER(m.isnearschool)) THEN 0.1
             WHEN TRIM(UPPER(u.isnearchurch)) = TRIM(UPPER(m.isnearchurch)) THEN 0.1
             WHEN TRIM(UPPER(u.isnearmall)) = TRIM(UPPER(m.isnearmall)) THEN 0.1
             ELSE 0
         END) AS score
  FROM userpreferencestable u
  LEFT JOIN propertiestable m ON u.type = m.type AND u.location = m.location
  HAVING score > 0
  ORDER BY score DESC;
`;
  
    db.query(sqlGet, (error, results) => {
      if (error) {
        // handle error
        console.error("Error executing query:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
  
      res.send(results);
    });
});

// -- GET ALL PROPERTIES FOR PROPERTY PAGE--
app.get("/api/get/properties", (req, res) => {
  const sqlGetallProperties = "SELECT * FROM propertiestable";
  db.query(sqlGetallProperties, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
});

// -- GET PREFERRECES--
app.get("/api/get/option/location", (req, res) => {
  const sqlGetoptionLocation = "SELECT DISTINCT location FROM propertiestable";
  db.query(sqlGetoptionLocation, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
});

// -- GET PREFERRECES --
app.get("/api/get/option/type", (req, res) => {
  const sqlGetoptionType = "SELECT DISTINCT type FROM propertiestable";
  db.query(sqlGetoptionType, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
});

// -- GET PREFERRECES --
app.get("/api/get/option/price", (req, res) => {
  const sqlGetoptionPrice = "SELECT DISTINCT price FROM propertiestable";
  db.query(sqlGetoptionPrice, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
});

// -- SET USERS PREFERENCES --
app.post("/api/post/submitpreferences", (req, res) => {
  const { location, house_type, price, near_school, near_church, near_mall } = req.body;

  // Check if any of the submitted values are the default placeholder values
  if (
      location === "Select Preferred Location" ||
      house_type === "Select Preferred House Type" ||
      price === "Select Price" ||
      near_school === "Yes or No" ||
      near_church === "Yes or No" ||
      near_mall === "Yes or No"
  ) {
      res.status(400).send("Please select valid preferences");
      return;
  }

  const updatepref = `
    UPDATE userpreferencestable
    SET type = ?, location = ?, price = ?, isnearschool = ?, isnearchurch = ?, isnearmall = ?
    WHERE id = 1`; // Assuming user_id is 1

  db.query(updatepref, [house_type, location, price, near_school, near_church, near_mall], (err, result) => {
      if (err) {
          console.error("Error updating preference:", err);
          res.status(500).send("Error updating preference");
          return;
      }
      if (result.affectedRows === 0) {
          // If no rows were affected, it means there was no existing preference for the user
          res.status(404).send("No preference found for the user");
          return;
      }
      console.log('Your preferences are all set check if you got a match');
      // Sending success response
      res.send('Your preferences are all set check if you got a match');
  });
});


app.listen(8800, () => {
  console.log("API working");
});
