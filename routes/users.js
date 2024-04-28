import express from "express";
import { getUserProfile, updateUserProfile } from '../controllers/user.js';

const router = express.Router();

// Define the route for fetching user profile
router.get("/:userId/profile", getUserProfile);

// Route for updating user profile
router.put('/:userId/updprofile', updateUserProfile);

export default router;
