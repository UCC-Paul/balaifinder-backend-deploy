import express from "express";
import { getUserProfile, updateUserProfile } from '../controllers/user.js';

const router = express.Router();

// Define the route for fetching user profile
router.get("/profile", getUserProfile);

// Route for updating user profile
router.put('/profile', updateUserProfile);

export default router;
