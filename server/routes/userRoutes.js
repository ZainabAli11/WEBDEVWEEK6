import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  becomeOwner,
  getUserCars
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected user routes
router.get("/data", protect, getUserData);
router.post("/become-owner", protect, becomeOwner);
router.get("/cars", protect, getUserCars); // Get cars added by current user

export default router;
