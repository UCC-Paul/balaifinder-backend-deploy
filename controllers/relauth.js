import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const relregister = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM realtor WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO realtor (`first_name`, `last_name`, `gender`, `company`, `email`, `password`) VALUE (?)";

    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.gender,
      req.body.company,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Realtor has been created.");
    });
  });
};

export const rellogin = (req, res) => {
  const q = "SELECT * FROM realtor WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);  
    if (data.length === 0) return res.status(404).json("Realtor not found!");

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
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
        partitioned: true,
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