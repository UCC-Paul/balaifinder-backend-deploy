import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./connect.js";

const app = express();

/// Middleware
app.use(cors({
  origin: "https://production-swart.vercel.app",
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());
app.use(express.json());

// Additional CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


//NEW CORS
//app.use(cors());


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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// -- Main SQL ALGORITHM -- 
app.get("/api/get", (req, res) => {
  const sqlGet = `
  WITH cte_match_counts AS (
    SELECT
      u.id AS user_id,
      m.id AS prop_id,
      
      CASE 
        WHEN u.type = m.type THEN 1
        ELSE 0
      END AS type_match,
      
      CASE 
        WHEN u.location = m.location THEN 1
        ELSE 0
      END AS loc_match,
      
      CASE 
        WHEN u.price <= m.price * 1.1 AND u.price >= m.price * 0.9 THEN 1
        ELSE 0
      END AS price_range_match,
      
      CASE 
        WHEN TRIM(UPPER(u.isnearschool)) = TRIM(UPPER(m.isnearschool)) THEN 1
        ELSE 0
      END AS isnearschool_match,
      
      CASE 
        WHEN TRIM(UPPER(u.isnearchurch)) = TRIM(UPPER(m.isnearchurch)) THEN 1
        ELSE 0
      END AS isnearchurch_match,
      
      CASE 
        WHEN TRIM(UPPER(u.isnearmall)) = TRIM(UPPER(m.isnearmall)) THEN 1
        ELSE 0
      END AS isnearmall_match
    FROM userpreferencestable u
    LEFT JOIN propertiestable m ON u.type = m.type AND u.location = m.location
  ),
  cte_individual_scores AS (
    SELECT
      user_id,
      prop_id,
      type_match * 0.35 AS type_score,
      loc_match * 0.3 AS loc_score,
      price_range_match * 0.25 AS price_score,
      isnearschool_match * (0.025 + (0.15 / 3)) AS isnearschool_score,
      isnearchurch_match * (0.025 + (0.15 / 3)) AS isnearchurch_score,
      isnearmall_match * (0.025 + (0.15 / 3)) AS isnearmall_score
    FROM cte_match_counts
  ),
  cte_total_scores AS (
    SELECT
      user_id,
      prop_id,
      type_score + loc_score + price_score + isnearschool_score + isnearchurch_score + isnearmall_score AS total_score
    FROM cte_individual_scores
  )
  SELECT t.*
  FROM cte_total_scores t
  JOIN (
    SELECT MAX(total_score) AS max_score
    FROM cte_total_scores
  ) tm ON t.total_score = tm.max_score
  ORDER BY t.total_score DESC;
  `;
  
  db.query(sqlGet, (error, results) => {
    if (error) {
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

// -- GET PREFERRECES LOCATION--
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

// -- GET PREFERRECES TYPE --
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

// -- GET PREFERRECES PRICE --
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

// -- GET PREFERRECES NEAR MALL --
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

// -- GET PREFERRECES NEAR CHURCH --
app.get("/api/get/option/nearmall", (req, res) => {
  const sqlGetoptionNearMall = "SELECT DISTINCT isnearmall FROM propertiestable";
  db.query(sqlGetoptionNearMall, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
});

// -- GET PREFERRECES NEAR SCHOOL --
app.get("/api/get/option/nearschool", (req, res) => {
  const sqlGetoptionNearSchool = "SELECT DISTINCT isnearschool FROM propertiestable";
  db.query(sqlGetoptionNearSchool, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
});

// -- GET PREFERRECES NEAR CHURCH --
app.get("/api/get/option/nearchurch", (req, res) => {
  const sqlGetoptionNearChurch = "SELECT DISTINCT isnearchurch FROM propertiestable";
  db.query(sqlGetoptionNearChurch, (err, result) => {
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

app.options("/api/auth/login", (req, res) => {
  res.sendStatus(200);
});

app.listen(8800, () => {
  console.log("API working");
});
