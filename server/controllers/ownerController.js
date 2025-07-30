import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

export const addCar = async (req, res) => {
  try {
    const { file } = req;
    const carData = JSON.parse(req.body.carData);

    if (!file || !carData) {
      return res.status(400).json({ success: false, message: "Image and car data required" });
    }

    const fileBuffer = fs.readFileSync(file.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: file.originalname,
      folder: "/cars",
    });

    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const newCar = await Car.create({
      ...carData,
      image: optimizedImageURL,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

export const changeRoleToOwner = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = "owner";
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Role updated to owner",
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const toggleCarAvailabilty = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (!car || car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Car not found or unauthorized" });
    }

    car.available = !car.available;
    await car.save();

    res.json({ success: true, car });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (!car || car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Car not found or unauthorized" });
    }

    await Car.findByIdAndDelete(carId);
    res.json({ success: true, message: "Car deleted" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate("car").sort({ createdAt: -1 });
    const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
    const completedBookings = await Booking.find({ owner: _id, status: "confirmed" });

    const monthlyRevenue = bookings
      .filter(booking => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 5),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await User.findByIdAndUpdate(_id, { image: optimizedImageURL });
    res.json({ success: true, image: optimizedImageURL });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};
