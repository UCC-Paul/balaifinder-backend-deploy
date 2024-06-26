import { db } from "../connect.js";

export const addproperties = (req, res) => {
  console.log("Received property data:", req.body); // Log received property data
  const realtorId = req.params.userId; // Assuming user_id is 1
  
  const sqlAddproperty =
    "INSERT INTO propertiestable (`realtor_id`, `name`, `location`, `address`, `type`, `price`, `monthly`, `nearelementary`, `nearhighschool`, `nearcollege`, `isnearmall`, `isnearchurch`, `numberofbedroom`, `numberofbathroom`, `typeoflot`, `familysize`, `businessready`, `description`, `imgsrc`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  const values = [
    realtorId,
    req.body.name,
    req.body.location,
    req.body.address,
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
};

export const updateproperties = (req, res) => {
  const propId = req.params.id;
  const updatedProperty = req.body;

  let sqlUpdateProperty = 'UPDATE propertiestable SET';
  const values = [];

  Object.keys(updatedProperty).forEach((key, index) => {
      if (key !== 'id') {
          sqlUpdateProperty += ` ${key} = ?,`;
          values.push(updatedProperty[key]);
      }
  });

  // Remove the trailing comma from the SQL query
  sqlUpdateProperty = sqlUpdateProperty.slice(0, -1);

  sqlUpdateProperty += ' WHERE id = ?';
  values.push(propId);

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
};


export const deleteproperties = (req, res) => {
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
};
