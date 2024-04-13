import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getUserProfile = (req, res) => {
  // Extract the accessToken from cookies or headers
  const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: Access Token is missing" });
  }

  try {
    // Verify the accessToken using the secret key
    const decoded = jwt.verify(accessToken, "secretkey");

    const userId = decoded.id;

    // Query the database to fetch user details
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [userId], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return user details excluding the password
      const { password, ...userDetails } = data[0];
      return res.status(200).json(userDetails);
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid Access Token" });
  }
};

export const updateUserProfile = (req, res) => {
    // Extract user ID from the authenticated request
    const accessToken = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized: Access Token is missing' });
    }
  
    try {
      // Verify the accessToken using the secret key
      const decoded = jwt.verify(accessToken, 'secretkey');
  
      const userId = decoded.id;
  
      const {
        first_name,
        last_name,
        email,
        bday,
        gender,
        address,
        region,
        province,
        municipality,
        pin,
      } = req.body;
  
      // Update user profile in the database
      const q =
        'UPDATE users SET first_name = ?, last_name = ?, email = ?, bday = ?, gender = ?, address = ?, region = ?, province = ?, municipality = ?, pin = ? WHERE id = ?';
  
      const values = [
        first_name,
        last_name,
        email,
        bday,
        gender,
        address,
        region,
        province,
        municipality,
        pin,
        userId,
      ];
  
      db.query(q, values, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        return res.status(200).json({ message: 'User profile updated successfully' });
      });
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Access Token' });
    }
  };