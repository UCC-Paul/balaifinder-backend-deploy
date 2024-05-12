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
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
  });

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="https://matchwithbalaifinder.vercel.app/verify/${verificationToken}">here</a> to verify your email address.</p>`
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

export const relregister = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM realtor WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Generate verification token
    const verificationToken = generateVerificationToken();

    //CREATE A NEW USER
    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO realtor (`first_name`, `last_name`, `gender`, `company`, `email`, `password`, `verified`, `verification_token`) VALUE (?)";

    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.gender,
      req.body.company,
      req.body.email,
      hashedPassword,
      0,
      verificationToken
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      // Send verification email
      sendVerificationEmail(req.body.email, verificationToken);

      return res.status(200).json("Realtor has been created.");
    });
  });
};

export const rellogin = (req, res) => {
  const q = "SELECT * FROM realtor WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);  
    if (data.length === 0) return res.status(404).json("Realtor not found!");

    const user = data[0];

    if (!user.verified) {
      return res.status(403).json("Email not verified. Please verify your email before logging in.");
    }

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

export const rellogout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Realtor has been logged out.");
};