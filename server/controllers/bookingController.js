import Booking from '../models/Booking.js';
import Car from "../models/Car.js";

const checkAvailability =async(car,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
    })
    return bookings.length===0;
}
export const checkAvailabilityOfCar=async(req,res)=>{
  try{
    const {location,pickupDate,returnDate}=req.body;
    const cars=await Car.find({location,isAvailable:true});
    const availableCarsPromises=cars.map(async(car)=>{
        const isAvailable=await checkAvailability(car._id,pickupDate,returnDate)
        return {...car._doc,isAvailable:isAvailable};
    })
    let availableCars=await Promise.all(availableCarsPromises);
    availableCars=availableCars.filter(car=>car.isAvailable===true)
    res.json({success:true,availableCars});
  } catch(error){
    console.log(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car not available" });
    }
    const carData = await Car.findById(car);

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned.getTime() - picked.getTime()) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price
    });
    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const bookings = await Booking.find({ owner: _id }).populate("car").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const changeBookingStatus = async (req, res) => {
    try {
        const {_id}=req.user;
       const {bookingId,status}=req.body;
       const booking=await Booking.findById(bookingId);
       if(booking.owner.toString()!==_id.toString()){
        return res.json({success:false,message:"Unauthorized"});
       }
       booking.status=status;
       await booking.save();
       res.json({success:true,booking});
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Server error: " + error.message });
    }
};