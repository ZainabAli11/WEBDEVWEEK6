import React, { useState } from 'react';
import mainCar from '../assets/main_car.png';
import { assets } from '../assets/assets';

const cityList = [
  "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala",
  "Peshawar", "Multan", "Hyderabad", "Islamabad", "Quetta",
  "Bahawalpur", "Sargodha", "Sialkot", "Sheikhupura", "Rahim Yar Khan",
  "Jhang", "Dera Ghazi Khan", "Gujrat", "Sahiwal", "Wah Cantonment",
  "Kasur", "Mardan", "Okara", "Mingora", "Nawabshah",
  "Mirpur Khas", "Chiniot", "Kamoke", "Burewala", "Jacobabad",
  "Khanewal", "Shikarpur", "Hafizabad", "Kohat", "Dera Ismail Khan",
  "Tando Adam", "Tando Allahyar", "Muzaffargarh", "Kotri", "Vehari",
  "Dadu", "Gojra", "Samundri", "Muridke", "Pakpattan",
  "Abottabad", "Turbat", "Khairpur", "Jhelum", "Hub",
  "Mansehra", "Layyah", "Charsadda", "Kamalia", "Toba Tek Singh",
  "Haripur", "Shahdadkot", "Pattoki", "Bhalwal", "Mandi Bahauddin",
  "Kandhkot", "Bhakkar", "Jamshoro", "Arifwala", "Chishtian",
  "Attock", "Muzaffarabad", "Kot Addu", "Daska", "Narowal",
  "Mianwali", "Lodhran", "Nowshera", "Swabi", "Gilgit",
  "Shahdadpur", "Badin", "Jaranwala", "Hujra Shah Muqeem", "Khuzdar",
  "Umerkot", "Shujaabad", "Ahmedpur East", "Larkana", "Zhob",
  "Tando Muhammad Khan", "Gujar Khan", "Khairpur Tamewali", "Mian Channu", "Fort Abbas",
  "Sanghar", "Kotli", "Digri", "Tando Bago", "Tando Ghulam Ali",
  "Pasrur", "Kot Samaba", "Jatoi", "Basirpur", "Kahror Pakka",
  "Pano Aqil", "Chakwal", "Kabal", "Matli", "Dunyapur",
  "Pind Dadan Khan", "Tandlianwala", "Phalia", "Farooqabad", "Shorkot",
  "Topi", "Risalpur", "Dera Allahyar", "Hangu", "Tank",
  "Mastung", "Dera Murad Jamali", "Ziarat", "Kalat",
  "Gwadar", "Pasni", "Ormara", "Chaman", "Parachinar", "Sibi"
];

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-12 bg-white text-center px-4">
      
      <h1 className="mt-100 text-4xl md:text-5xl font-semibold">
        Premium Cars. Affordable Rents.
      </h1>

      <form className='flex flex-col md:flex-row items-start md:items-center 
        justify-between p-6 rounded-lg md:rounded-full w-full 
        max-w-[1000px] bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] gap-6'>

        {/* Pickup Location */}
        <div className='flex flex-col items-start gap-2 w-full md:w-auto'>
          <label className='text-sm text-gray-700'>Pickup Location</label>
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-56"
          >
            <option value="">Select City</option>
            {cityList.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Pickup Date */}
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='pickup-date' className='text-sm text-gray-700'>Pick-up Date</label>
          <input
            type="date"
            id="pickup-date"
            min={new Date().toISOString().split("T")[0]}
            className='border rounded px-4 py-2 text-sm text-gray-700'
            required
          />
        </div>

        {/* Return Date */}
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='return-date' className='text-sm text-gray-700'>Return Date</label>
          <input
            type="date"
            id="return-date"
            className='border rounded px-4 py-2 text-sm text-gray-700'
            required
          />
        </div>

        {/* Search Button */}
        <button type="submit" className='flex items-center justify-center gap-2
          px-8 py-3 bg-primary hover:bg-primary-dull text-white rounded-full'>
          <img src={assets.search_icon} alt="search" className='brightness-300 w-4 h-4' />
          Search
        </button>
      </form>

      <img src={mainCar} alt="car" className="max-h-130 object-contain" />
    </div>
  );
};

export default Hero;
