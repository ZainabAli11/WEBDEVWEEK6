import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>
      <div className='text-white max-w-xl'>
        <p className='uppercase text-sm tracking-widest mb-2'>Earn While You Park</p>
        <h2 className='text-3xl font-semibold leading-snug'>
          Put Your Luxury Car to Work
        </h2>
        <p className='mt-3 text-base'>
          Join thousands of car owners earning passive income through CarRental. We handle everything — you enjoy the profits.
        </p>
        <ul className='mt-4 list-disc list-inside space-y-1 text-sm'>
          <li>Full insurance coverage</li>
          <li>Driver verification & support</li>
          <li>Fast and secure payouts</li>
        </ul>
        <button className="mt-6 px-6 py-2 bg-white text-[#0558FE] font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all">
          List Your Car Now
        </button>
      </div>
      <img src={assets.banner_car_image} alt="Luxury Car" className='max-h-60 mt-10 md:mt-0' />
    </div>
  );
};

export default Banner;
