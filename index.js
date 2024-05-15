import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import relauthRoutes from "./routes/relauth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path'
import { showAlgorithmResult } from "./controllers/algorithm.js";
import { addproperties, deleteproperties, updateproperties } from "./controllers/crud.js";
import { ald, apply, getStatusAndComments, getapplications, getuserapplicationbyid, getlikes, getlocation, getprice, getproperty, getpropertybyid, gettype, submitpreferences, updateStatus, getStatus, getpropertybyrealtorid, like } from "./controllers/functions.js";

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
app.post("/api/post/crud/addproperties/:userId", addproperties); // CHECKED WORKING!
app.delete("/api/delete/crud/delproperties/:id", deleteproperties); // CHECKED WORKING!
app.put("/api/update/crud/updproperties/:id", updateproperties); // CHECKED WORKING!
app.put('/api/update/application/:id/status', updateStatus); 
app.get('/api/get/:userId/properties', getpropertybyrealtorid);
app.get("/api/get/option/location", getlocation); // CHECKED WORKING!
app.get("/api/get/option/price", getprice); // CHECKED WORKING!
app.get("/api/get/option/type", gettype); // CHECKED WORKING!
app.get("/api/get/applications/:userId", getapplications); // CHECKED WORKING!
app.get("/api/get/properties/:id", getpropertybyid); // CHECKED WORKING!
app.get("/api/get/properties", getproperty); // CHECKED WORKING!
app.post("/api/post/:userId/submitpreferences", submitpreferences);
app.get('/api/get/:userId/likes', getlikes);
app.post("/api/post/:userId/like", like);


app.post('/api/post/apply/:userId', apply);

app.get('/api/get/application/:id/status', getStatusAndComments)
app.get('/api/get/:userId/user/application', getuserapplicationbyid);
app.get('/api/get/:userId/user/status', getStatus);


app.options("/api/auth/login", (req, res) => {
  res.sendStatus(200);
});


app.listen(8800, () => {
  console.log("API working");
});

