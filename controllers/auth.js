import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

// Function to generate a random verification token
const generateVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Function to send verification email
const sendVerificationEmail = (email, verificationToken) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Your email configuration here (e.g., Gmail, SMTP, etc.)
    service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
  });

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="https://balaifinder-backend-deploy.onrender.com/verify/${verificationToken}">here</a> to verify your email address.</p>`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const register = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Generate verification token
    const verificationToken = generateVerificationToken();

    //CREATE A NEW USER
    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`first_name`, `last_name`, `email`, `password`, `bday`, `gender`, `address`, `region`, `province`, `municipality`, `verified`, `verification_token`) VALUE (?)";

    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      hashedPassword,
      req.body.bday,
      req.body.gender,
      req.body.address,
      req.body.region,
      req.body.province,
      req.body.municipality,
      0,
      verificationToken
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      // Send verification email
      sendVerificationEmail(req.body.email, verificationToken);

      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or email!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        domain: ".balaifinder-backend-deploy.onrender.com",
        partitioned: true,
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

// Endpoint to handle email verification
export const verifyEmail = (req, res) => {
  const verificationToken = req.params.token;

  // Check if the verification token exists in the database
  const q = "SELECT * FROM users WHERE verification_token = ?";

  db.query(q, [verificationToken], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Verification token not found!");

    // Update the 'verified' field to 1 (true)
    const updateQuery = "UPDATE users SET verified = 1 WHERE verification_token = ?";
    db.query(updateQuery, [verificationToken], (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Email verified successfully.");
    });
  });
};