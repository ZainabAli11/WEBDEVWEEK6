import React, { useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const Addcar = () => {
  const currency = import.meta.env.VITE_CURRENCY || "PKR";

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return alert("❌ Please upload an image!");

    const confirmSubmit = window.confirm("🚗 Do you want to list this car?");
    if (!confirmSubmit) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("carData", JSON.stringify(car));

    try {
      const res = await fetch("/api/owner/add-car", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Car listed successfully!");
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        });
        setImage(null);
      } else {
        alert(data.message || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error occurred.");
    }
  };

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title="Add New Car" subTitle="Fill in the details below" />

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-700 text-sm mt-6 max-w-xl'
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div className='flex items-center gap-3'>
          <label htmlFor="car-image" className='cursor-pointer'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Car"
              className='h-16 w-24 object-cover rounded border'
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <span>Upload picture of the car</span>
        </div>

        {/* Text Inputs */}
        {[
          { name: 'brand', placeholder: 'Brand' },
          { name: 'model', placeholder: 'Model' },
          { name: 'year', placeholder: 'Year', type: 'number' },
          { name: 'pricePerDay', placeholder: `Price per Day (${currency})`, type: 'number' },
          { name: 'category', placeholder: 'Category (e.g., SUV, Sedan)' },
          { name: 'transmission', placeholder: 'Transmission (e.g., Auto, Manual)' },
          { name: 'fuel_type', placeholder: 'Fuel Type (e.g., Petrol, Diesel)' },
          { name: 'seating_capacity', placeholder: 'Seating Capacity', type: 'number' },
          { name: 'location', placeholder: 'Location (e.g., Lahore, Karachi)' },
        ].map((input) => (
          <input
            key={input.name}
            name={input.name}
            type={input.type || 'text'}
            placeholder={input.placeholder}
            required
            value={car[input.name]}
            onChange={onChangeInput}
            className='px-3 py-2 border border-borderColor rounded-md outline-none'
          />
        ))}

        {/* Description */}
        <textarea
          name="description"
          rows={4}
          placeholder='Enter car description'
          required
          value={car.description}
          onChange={onChangeInput}
          className='px-3 py-2 border border-borderColor rounded-md outline-none'
        />

        {/* Submit Button */}
        <button
          type="submit"
          className='flex items-center gap-2 px-4 py-2 mt-2 bg-primary text-white rounded-md font-medium w-max'
        >
          <img src={assets.tick_icon} alt="Tick" className='h-5 w-5' />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default Addcar;
