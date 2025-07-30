import express from "express";
import multer from "multer";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  toggleCarAvailabilty,
  getOwnerCars,
  getDashboardData
} from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import { updateUserImage } from "../controllers/ownerController.js";

const ownerRouter = express.Router();
const upload = multer({ dest: "uploads/" });

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", protect, upload.single("image"), addCar);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailabilty);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("update-image", protect, upload.single("image"), updateUserImage);
export default ownerRouter;
