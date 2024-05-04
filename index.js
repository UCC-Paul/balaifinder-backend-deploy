import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import relauthRoutes from "./routes/relauth.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { db } from "./connect.js";
import path from 'path'
import { showAlgorithmResult } from "./controllers/algorithm.js";
import { addproperties, deleteproperties, updateproperties } from "./controllers/crud.js";
import { ald, apply, getStatusAndComments, getapplications, getuserapplicationbyid, getlikes, getlocation, getprice, getproperty, getpropertybyid, gettype, submitpreferences, updateStatus } from "./controllers/functions.js";


const app = express();

//Backend Design
app.get('', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(process.cwd(), 'index.html'));
});


/// Middleware
app.use(cors({
  origin: ["https://matchwithbalaifinder.vercel.app"],
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));


app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
  // Add headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "https://matchwithbalaifinder.vercel.app");
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
app.use("/api/relauth", relauthRoutes);
app.get("/api/get", showAlgorithmResult);
app.post("/api/post/crud/addproperties", addproperties);
app.delete("/api/delete/crud/delproperties/:id", deleteproperties);
app.put("/api/update/crud/updproperties/:id", updateproperties);
app.get("/api/get/option/location", getlocation);
app.get("/api/get/option/price", getprice);
app.get("/api/get/option/type", gettype);
app.get("/api/get/applications", getapplications);
app.get("/api/get/properties/:id", getpropertybyid);
app.get("/api/get/properties", getproperty);
app.post("/api/post/:userId/submitpreferences", submitpreferences);
app.post("/api/post/:userId/ald", ald);
app.get('/api/get/:userId/likes', getlikes);
app.post('/api/post/apply', apply);
app.put('/api/update/application/:id/status', updateStatus);
app.get('/api/get/application/:id/status', getStatusAndComments)
app.get('/api/get/:userId/user/application', getuserapplicationbyid);


app.options("/api/auth/login", (req, res) => {
  res.sendStatus(200);
});


app.listen(8800, () => {
  console.log("API working");
});

