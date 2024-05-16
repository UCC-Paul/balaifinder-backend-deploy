import { db } from "../connect.js";
import fileUpload from "express-fileupload";
import multer from 'multer';

//USED FOR POPULATING OPTIONS LOCATION IN SETTING PREFERENCES
export const getlocation = (req, res) => {
    const sqlGetoptionLocation = "SELECT DISTINCT location FROM propertiestable";
    db.query(sqlGetoptionLocation, (err, result) => {
        if (err) {
        console.log("error", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        console.log("result", result);
        res.send(result);
    });
};

//USED FOR POPULATING OPTIONS TYPE IN SETTING PREFERENCES
export const gettype = (req, res) => {
    const sqlGetoptionType = "SELECT DISTINCT type FROM propertiestable";
    db.query(sqlGetoptionType, (err, result) => {
        if (err) {
        console.log("error", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        console.log("result", result);
        res.send(result);
    });
};

//USED FOR POPULATING OPTIONS PRICE IN SETTING PREFERENCES
export const getprice = (req, res) => {
    const sqlGetoptionPrice = "SELECT DISTINCT price FROM propertiestable";
    db.query(sqlGetoptionPrice, (err, result) => {
        if (err) {
        console.log("error", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        console.log("result", result);
        res.send(result);
    });
};

//USED TO GET APPLICATION TO REALTOR PAGE INBOX
export const getapplications = (req, res) => {
  const realtor_id = req.params.userId;

  if (!realtor_id) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
  }
  const sqlGetMessages = "SELECT * FROM userapplicationtable WHERE realtor_id = ?";
  db.query(sqlGetMessages, [realtor_id], (err, result) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result);
  });
};

//USED IN LISTING ALL PROPERTY IN PROPERTY LIST/PAGE
export const getproperty = (req, res) => {
    const sqlGetallProperties = "SELECT * FROM propertiestable";
    db.query(sqlGetallProperties, (err, result) => {
        if (err) {
        console.log("error", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        console.log("result", result);
        res.send(result);
    });
};

//USED IN PROPERTY DETAILS PAGE
export const getpropertybyid = (req, res) => {
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
};

//USED IN REALTOR MANAGE PROPERTY PAGE TO SHOW HIS OWN PROPERTY
export const getpropertybyrealtorid = (req, res) => {
  const realtor_id = req.params.userId;

  if (!realtor_id) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
  }

  const sqlGetPropertyByRealtorId = "SELECT * FROM propertiestable WHERE realtor_id = ?";
  db.query(sqlGetPropertyByRealtorId, [realtor_id], (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("result", result);
    res.send(result);
  });
};

//USED IN SUBMITTING ALGORITH PREFERENCES
export const submitpreferences = (req, res) => {
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
};

export const like = (req, res) => {
  console.log(req.body); // Log the request body to see its structure
  const { productId } = req.body; // Check if productId exists in req.body
  if (!productId) {
    return res.status(400).json({ message: "ProductId is missing in the request body" });
  }

  const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
  }

  // Check if the combination of user_id and product_id already exists
  const sqlCheckExistence = `SELECT * FROM userliketable WHERE user_id = ? AND property_id = ?`;

  db.query(sqlCheckExistence, [userId, productId], (err, result) => {
    if (err) {
      console.error("Error checking existence in userliketable:", err);
      return res.status(500).json({ error: "Error checking existence in userliketable" });
    }

    // If the result contains any rows, it means the combination already exists
    if (result.length > 0) {
      return res.status(400).json({ message: "User has already liked this property" });
    }

    // Insert product ID and user ID into the userliketable
    const sqlInsertProductId = `INSERT INTO userliketable (user_id, property_id) VALUES (?, ?)`;

    db.query(sqlInsertProductId, [userId, productId], (err, result) => {
      if (err) {
        console.error("Error inserting product ID into userliketable:", err);
        return res.status(500).json({ error: "Error inserting product ID into userliketable" });
      }
      console.log("Product ID inserted successfully into userliketable");
      res.json({ message: "Product ID inserted successfully into userliketable" });
    });
  });
};

//USED IN GETTING USER LIKES
export const getlikes = (req, res) => {
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
}

//USED IN USER APPLY FOR PROPERTY
export const apply = (req, res) => {
  const { propertyId, realtorId, firstName, lastName, email, fileUrl, companyIdUrl } = req.body;
  const userId = req.params.userId;

  // Check if the combination of user_id and property_id already exists
  const sqlCheckExistence = `SELECT * FROM userapplicationtable WHERE user_id = ? AND property_id = ?`;

  db.query(sqlCheckExistence, [userId, propertyId], (err, result) => {
    if (err) {
      console.error('Error checking existence in userapplicationtable:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length > 0) {
      console.log('You already applied');
      return res.status(400).json({ message: 'You already applied' });
    }

    // Insert new data if the combination doesn't exist
    const sqlInsertApplication = `INSERT INTO userapplicationtable (user_id, property_id, realtor_id, first_name, last_name, email, certificate, companyid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "PENDING")`;
    const values = [userId, propertyId, realtorId, firstName, lastName, email, fileUrl, companyIdUrl];

    db.query(sqlInsertApplication, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into userapplicationtable:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Data inserted into userapplicationtable:', result);
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  });
};

export const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status, comments } = req.body;
  const sqlUpdateStatus = "UPDATE userapplicationtable SET status = ?, comments = ? WHERE id = ?";
  db.query(sqlUpdateStatus, [status, comments, id], (err, result) => {
      if (err) {
          console.error('Error updating status and comments:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Status and comments updated successfully');
      res.json({ message: 'Status and comments updated successfully' });
  });
};

export const getStatusAndComments = (req, res) => {
  const { id } = req.params;
  const sqlGetStatusAndComments = "SELECT status, comments FROM userapplicationtable WHERE id = ?";
  db.query(sqlGetStatusAndComments, [id], (err, result) => {
      if (err) {
          console.error('Error fetching status and comments:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      // Check if any data was found for the given ID
      if (result.length === 0) {
          return res.status(404).json({ error: 'Application not found' });
      }
      // Return the status and comments
      const { status, comments } = result[0];
      res.json({ status, comments });
  });
};

export const getuserapplicationbyid = (req, res) => {
  const userId = req.params.userId;

if (!userId) {
  return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
}

const query = `SELECT property_id FROM userapplicationtable WHERE user_id = ?`;

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
}

export const getStatus = (req, res) => {
  const userId = req.params.userId;
  const sqlGetStatus = "SELECT status, comments FROM userapplicationtable WHERE user_id = ?";
  db.query(sqlGetStatus, [userId], (err, result) => {
      if (err) {
          console.error('Error fetching status:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      // Check if any data was found for the given ID
      if (result.length === 0) {
          return res.status(404).json({ error: 'Application not found' });
      }
      // Return the status
      const { status, comments } = result[0];
      res.json({ status, comments });
  });
};