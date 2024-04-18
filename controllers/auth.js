import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // Check if user exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (existingUser.length > 0) {
      return res.status(409).json("User already exists!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Insert new user
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      bday: req.body.bday,
      gender: req.body.gender,
      address: req.body.address,
      region: req.body.region,
      province: req.body.province,
      municipality: req.body.municipality,
    };

    await db.query("INSERT INTO users SET ?", [newUser]);

    res.status(200).json("User has been created.");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (user.length === 0) {
      return res.status(404).json("User not found!");
    }

    const checkPassword = await bcrypt.compare(req.body.password, user[0].password);

    if (!checkPassword) {
      return res.status(400).json("Wrong password or email!");
    }

    const token = jwt.sign({ id: user[0].id }, "secretkey", { expiresIn: "1h" });

    const { password, ...userData } = user[0]; // Exclude password from response

    res.cookie("accessToken", token, {
      httpOnly: true,
      // Secure: true, // Enable if using HTTPS
      // SameSite: "None", // Enable for cross-site requests with HTTPS
    }).status(200).json(userData);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json("Internal server error");
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken").status(200).json("User has been logged out.");
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json("Internal server error");
  }
};