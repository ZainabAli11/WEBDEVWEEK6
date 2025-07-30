import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyCarData } from '../assets/assets';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [booking, setBooking] = useState({
    name: '',
    email: '',
    bookingDate: '',
    returnDate: ''
  });

  useEffect(() => {
    const foundCar = dummyCarData.find(
      (c) => c.id === id || c._id === id || c.id === parseInt(id)
    );
    setCar(foundCar);
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed!\nName: ${booking.name}\nBooking: ${booking.bookingDate}\nReturn: ${booking.returnDate}`);
  };

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-28">
      <Link to="/cars" className="flex items-center gap-2 mb-6 text-gray-500 hover:text-black">
        <span className="text-xl">&#8592;</span>
        Back to all Cars
      </Link>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={car.image}
          alt={car.model}
          className="w-[460px] h-[280px] rounded-xl object-cover shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{car.model}</h1>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Model:</strong> {car.model}</li>
            <li><strong>Year:</strong> {car.year}</li>
            <li><strong>Price per day:</strong> PKR {car.price}</li>
            <li><strong>Transmission:</strong> {car.transmission}</li>
            <li><strong>Fuel Type:</strong> {car.fuel_type}</li>
            <li><strong>Description:</strong> {car.description}</li>
          </ul>
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 w-full max-w-md rounded-xl shadow-lg space-y-4">
          <h2 className="text-lg font-semibold text-center mb-2 text-gray-700">Book This Car</h2>
          <input type="text" name="name" placeholder="Your Name" value={booking.name} onChange={handleChange} required className="w-full p-2 rounded border" />
          <input type="email" name="email" placeholder="Your Email" value={booking.email} onChange={handleChange} required className="w-full p-2 rounded border" />
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="date" name="bookingDate" value={booking.bookingDate} onChange={handleChange} required className="w-full p-2 rounded border" />
            <input type="date" name="returnDate" value={booking.returnDate} onChange={handleChange} required className="w-full p-2 rounded border" />
          </div>
          <button type="submit" className="w-full bg-[#0558FE] text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">Confirm Booking</button>
        </form>
      </div>
    </div>
  ) : (
    <p className="text-center mt-20 text-gray-500">Car not found.</p>
  );
};

export default CarDetails;
