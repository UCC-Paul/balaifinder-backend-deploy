import { db } from "../connect.js";

export const getUserProfile = (req, res) => {
  // Extract the user ID from local storage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID is missing" });
  }

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
};

export const updateUserProfile = (req, res) => {
  // Extract user ID from local storage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
  }

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
};
