import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./connect.js";
import jwt from "jsonwebtoken";
import { showAlgorithmResult } from "./controllers/algorithm.js";

const app = express();

/// Middleware
app.use(cors({
  origin: ["https://production-swart.vercel.app"],
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

/* FOR LOCALHOST
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));
*/

app.use(cookieParser());
app.use(express.json());

// Additional CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.get("/api/get", showAlgorithmResult);


// -- GET PRODUCT DETAILS BY ID --
app.get("/api/get/properties/:id", (req, res) => {
  const productId = req.params.id;
  const sqlGetProductById = "SELECT * FROM propertiestable WHERE id = ?";
  db.query(sqlGetProductById, [productId], (err, result) => {
    if (err) {
      console.error("Error fetching product details:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result[0]); // Assuming there's only one product with the given ID
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

// -- SET USERS PREFERENCES --
app.post("/api/post/submitpreferences", (req, res) => {
  const { location, house_type, price, near_elementary, near_highschool, near_college, businessready, near_church, near_mall, bedroom, bathroom, familysize, typeoflot} = req.body;
  // Check if any of the submitted values are the default placeholder values
  if (
    location === "Please Select" ||
    house_type === "Please Select" ||
    price === "Please Select" ||
    near_elementary === "Please Select" ||
    near_highschool === "Please Select" ||
    near_college === "Please Select" ||
    near_church === "Please Select" ||
    businessready === "Please Select" ||
    near_mall === "Please Select" ||
    bedroom === "Please Select" ||
    bathroom === "Please Select" 
  ) {
      res.status(400).send("Please select valid preferences");
      return;
  }

  const updatepref = `
  UPDATE userpreferencestable
  SET type = ?, location = ?, price = ?, nearelementary = ?, nearhighschool = ?, nearcollege = ?, businessready = ?, isnearchurch = ?, isnearmall = ?, numberofbedroom = ?, numberofbathroom = ?, familysize = ?, typeoflot = ?
  WHERE id = 1`; // Assuming user_id is 1

  db.query(updatepref, [house_type, location, price, near_elementary, near_highschool, near_college, businessready, near_church, near_mall, bedroom, bathroom, familysize, typeoflot], (err, result) => {
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



// -- PRIORITY SCORING RANGES INPUT
app.post('/api/post/submitpriority', (req, res) => {
  const rangeValues = req.body;
  const userId = req.userId; // Assuming you have user ID available in req object

  // Example SQL query to update values in the table
  const sqlUpdatePriority = `
    UPDATE userprioritytable
    SET
      locationpriority = ?,
      typepriority = ?,
      pricepriority = ?,
      isnearelementarypriority = ?,
      isnearhighschoolpriority = ?,
      isnearcollegepriority = ?,
      isnearmallpriority = ?,
      isnearchurchpriority = ?,
      bedroompriority = ?,
      bathroompriority = ?,
      familysizepriority = ?,
      businessreadypriority = ?,
      lottypepriority = ?
    WHERE user_id = 1
  `;

  // Extract values from rangeValues object
  const values = Object.values(rangeValues);
  values.push(userId); // Add userId to the values array

  // Execute the SQL query
  db.query(sqlUpdatePriority, values, (err, result) => {
    if (err) {
      console.error('Error updating values in database:', err);
      res.status(500).json({ message: 'Error updating preferences' });
      return;
    }
    console.log('Values updated in database successfully');
    res.status(200).json({ message: 'Preferences updated successfully' });
  });
});
//ALD TRIPLE BABY
// Endpoint for inserting Property data based on action
app.post("/api/post/ald", (req, res) => {
  const { productId, action } = req.body;

  // Extract user_id from JWT token
  const token = req.cookies.accessToken;
  const decodedToken = jwt.verify(token, "secretkey");
  const userId = decodedToken.id;

  let tableName = '';

  // Determine the table name based on action
  switch (action) {
    case 'ACCEPT':
      tableName = 'useraccepttable';
      break;
    case 'LIKE':
      tableName = 'userliketable';
      break;
    case 'DENY':
      tableName = 'userdenytable';
      break;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }

  // Check if the combination of user_id and product_id already exists
  const sqlCheckExistence = `SELECT * FROM ${tableName} WHERE user_id = ? AND property_id = ?`;

  db.query(sqlCheckExistence, [userId, productId], (err, result) => {
    if (err) {
      console.error(`Error checking existence in ${tableName}:`, err);
      return res.status(500).json({ error: `Error checking existence in ${tableName}` });
    }

    // If the result contains any rows, it means the combination already exists
    if (result.length > 0) {
      return res.status(400).json({ message: `User has already ${action.toLowerCase()}ed this property` });
    }

    // Insert product ID and user ID into the respective table
    const sqlInsertProductId = `INSERT INTO ${tableName} (user_id, property_id) VALUES (?, ?)`;

    db.query(sqlInsertProductId, [userId, productId], (err, result) => {
      if (err) {
        console.error(`Error inserting product ID into ${tableName}:`, err);
        return res.status(500).json({ error: `Error inserting product ID into ${tableName}` });
      }
      console.log(`Product ID inserted successfully into ${tableName}`);
      res.json({ message: `Product ID inserted successfully into ${tableName}` });
    });
  });
});

app.options("/api/auth/login", (req, res) => {
  res.sendStatus(200);
});

app.listen(8800, () => {
  console.log("API working");
});
