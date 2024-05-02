import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import crudRoutes from "./routes/crud.js";
import relauthRoutes from "./routes/relauth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./connect.js";
import path from 'path'
import jwt from "jsonwebtoken";
import { showAlgorithmResult } from "./controllers/algorithm.js";
import multer from 'multer';

const app = express();

//Backend Design
app.get('', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(process.cwd(), 'index.html'));
});


/// Middleware
app.use(cors({
  origin: ["https://balaifinder.vercel.app"],
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
//app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  //res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //res.setHeader("Access-Control-Allow-Credentials", "true");
  //next();
//});

app.use((req, res, next) => {
  // Add headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "https://balaifinder.vercel.app");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Add Authorization header if token is available
  const token = req.cookies.accessToken;
  if (token) {
    res.setHeader("Authorization", `Bearer ${token}`);
  }

  // Proceed to the next middleware
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/crud", crudRoutes);
app.use("/api/relauth", relauthRoutes);
app.get("/api/get", showAlgorithmResult);


// -- GET APPLICATIONS --
app.get("/api/get/applications", (req, res) => {
  // Define SQL query to fetch messages
  const sqlGetMessages = "SELECT * FROM userapplicationtable";

  // Execute the query
  db.query(sqlGetMessages, (err, result) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send the messages as JSON response
    res.json(result);
  });
});

// -- REALTOR ADD PROPERTY --
app.post("/api/post/crud/addproperties", (req, res) => {
  console.log("Received property data:", req.body); // Log received property data

  const sqlAddproperty =
    "INSERT INTO propertiestable (`name`, `location`, `type`, `price`, `monthly`, `nearelementary`, `nearhighschool`, `nearcollege`, `isnearmall`, `isnearchurch`, `numberofbedroom`, `numberofbathroom`, `typeoflot`, `familysize`, `businessready`, `description`, `imgsrc`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.name,
    req.body.location,
    req.body.type,
    req.body.price,
    req.body.monthly,
    req.body.nearelementary,
    req.body.nearhighschool,
    req.body.nearcollege,
    req.body.nearmall,
    req.body.nearchurch,
    req.body.numBedrooms,
    req.body.numBathrooms,
    req.body.typeoflot,
    req.body.familysize,
    req.body.businessready,
    req.body.description,
    req.body.imgsrc,
  ];

  db.query(sqlAddproperty, values, (err, data) => {
    if (err) {
      console.error("Error adding property:", err);
      return res.send(err);
    }
    console.log("Property added successfully:", data);
    return res.json(data);
  });
});

// -- REALTOR DELETE PROPERTY BY ID --
app.delete("/api/delete/crud/delproperties/:id", (req, res) => {
  const propId = req.params.id;

  // SQL query to delete the property with the given ID
  const sqlDeleteProperty = "DELETE FROM propertiestable WHERE id = ?";

  // Execute the SQL query
  db.query(sqlDeleteProperty, [propId], (err, result) => {
    if (err) {
      console.error("Error deleting property:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Send success response
    res.json({ message: "Property deleted successfully" });
  });
});

// -- REALTOR UPDATE PROPERTY --
app.put("/api/update/crud/updproperties/:id", (req, res) => {
  const propId = req.params.id;
  const updatedProperty = req.body;

  const sqlUpdateProperty = `
    UPDATE propertiestable
    SET
      name = ?,
      location = ?,
      type = ?,
      price = ?,
      monthly = ?,
      nearelementary = ?,
      nearhighschool = ?,
      nearcollege = ?,
      isnearmall = ?,
      isnearchurch = ?,
      numberofbedroom = ?,
      numberofbathroom = ?,
      typeoflot = ?,
      familysize = ?,
      businessready = ?,
      description = ?,
      imgsrc = ?
    WHERE id = ?
  `;

  const values = [
    updatedProperty.name,
    updatedProperty.location,
    updatedProperty.type,
    updatedProperty.price,
    updatedProperty.monthly,
    updatedProperty.nearelementary,
    updatedProperty.nearhighschool,
    updatedProperty.nearcollege,
    updatedProperty.nearmall,
    updatedProperty.nearchurch,
    updatedProperty.numBedrooms,
    updatedProperty.numBathrooms,
    updatedProperty.typeoflot,
    updatedProperty.familysize,
    updatedProperty.businessready,
    updatedProperty.description,
    updatedProperty.imgsrc,
    propId,
  ];

  db.query(sqlUpdateProperty, values, (err, result) => {
    if (err) {
      console.error("Error updating property:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    console.log("Property updated successfully");
    res.json({ message: "Property updated successfully" });
  });
});

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

// -- GET MESSAGES PRICE --
app.get("/api/messages", (req, res) => {
  // Define SQL query to fetch messages
  const sqlGetMessages = "SELECT * FROM userapplicationtable";

  // Execute the query
  db.query(sqlGetMessages, (err, result) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send the messages as JSON response
    res.json(result);
  });
});

// -- SET USERS PREFERENCES --
app.post("/api/post/:userId/submitpreferences", (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID is missing" });
  }
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

  const selectPref = `SELECT id FROM userpreferencestable WHERE user_id = ?`;
  db.query(selectPref, [userId], (err, result) => {
    if (err) {
      console.error("Error checking preference:", err);
      res.status(500).send("Error checking preference");
      return;
    }
    
    if (result.length > 0) {
      // If a preference already exists for the user, update it
      const updatePref = `
        UPDATE userpreferencestable
        SET type = ?, location = ?, price = ?, nearelementary = ?, nearhighschool = ?, nearcollege = ?, businessready = ?, isnearchurch = ?, isnearmall = ?, numberofbedroom = ?, numberofbathroom = ?, familysize = ?, typeoflot = ?
        WHERE user_id = ?`;

      db.query(updatePref, [house_type, location, price, near_elementary, near_highschool, near_college, businessready, near_church, near_mall, bedroom, bathroom, familysize, typeoflot, userId], (err, updateResult) => {
        if (err) {
          console.error("Error updating preference:", err);
          res.status(500).send("Error updating preference");
          return;
        }
        console.log('Your preferences are all set check if you got a match');
        // Sending success response
        res.send('Your preferences are all set check if you got a match');
      });
    } else {
      // If no preference exists for the user, insert a new row
      const insertPref = `
        INSERT INTO userpreferencestable (user_id, type, location, price, nearelementary, nearhighschool, nearcollege, businessready, isnearchurch, isnearmall, numberofbedroom, numberofbathroom, familysize, typeoflot)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(insertPref, [userId, house_type, location, price, near_elementary, near_highschool, near_college, businessready, near_church, near_mall, bedroom, bathroom, familysize, typeoflot], (err, insertResult) => {
        if (err) {
          console.error("Error inserting preference:", err);
          res.status(500).send("Error inserting preference");
          return;
        }
        console.log('New preferences added');
        // Sending success response
        res.send('Your preferences are all set check if you got a match');
      });
    }
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
app.post("/api/post/:userId/ald", (req, res) => {
  const { productId, action } = req.body;

  const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
  }

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

// -- GET LIKES --
app.get('/api/get/:userId/likes', (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
  }

  const query = `SELECT property_id FROM userliketable WHERE user_id = ?`;

  // Execute the query to get the list of property IDs liked by the user
  db.query(query, [userId], (error, results) => {
      if (error) {
          console.error('Error fetching liked properties:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      // Extract the property IDs from the query results
      const propertyIds = results.map(result => result.property_id);

      // If there are no property IDs, return an empty array
      if (propertyIds.length === 0) {
          res.json([]);
          return;
      }

      // Query to fetch properties data based on the property IDs
      const propertiesQuery = `SELECT * FROM propertiestable WHERE id IN (${propertyIds.join(',')})`;

      // Execute the query to fetch properties data
      db.query(propertiesQuery, (error, properties) => {
          if (error) {
              console.error('Error fetching properties:', error);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
          }
          // Send the fetched properties data as JSON response
          res.json(properties);
      });
  });
});


// -- USER APPLPLY FOR HOUSE
app.post('/api/post/apply', (req, res) => {
  const { propertyId, firstName, lastName, email } = req.body;
  const userId = 1; // Assuming user_id is 1

  // Check if the combination of user_id and property_id already exists
  const sqlCheckExistence = `SELECT * FROM userapplicationtable WHERE user_id = ? AND property_id = ?`;

  db.query(sqlCheckExistence, [userId, propertyId], (err, result) => {
    if (err) {
      console.error('Error checking existence in userapplicationtable:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // If the result contains any rows, it means the combination already exists
    if (result.length > 0) {
      console.log('You already applied');
      return res.status(400).json({ message: 'You already applied' });
    }

    // If the combination doesn't exist, insert new data
    const sqlInsertApplication = `INSERT INTO userapplicationtable (user_id, property_id, first_name, last_name, email, status) VALUES (?, ?, ?, ?, ?, "PENDING")`;
    const values = [userId, propertyId, firstName, lastName, email];

    // Execute the query to insert new data
    db.query(sqlInsertApplication, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into userapplicationtable:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Data inserted into userapplicationtable:', result);
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  });
});



app.options("/api/auth/login", (req, res) => {
  res.sendStatus(200);
});

/*
app.listen(() => {
  console.log("SERVER IS LIVE");
});
*/


app.listen(8800, () => {
  console.log("API working");
});
