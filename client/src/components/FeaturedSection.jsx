import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import CarCard from './CarCard';
import { dummyCarData, assets } from '../assets/assets';

const FeaturedSection = () => {
  const navigate = useNavigate();

  const featuredCars = dummyCarData.slice(0, 3);

  return (
    <div className='flex flex-col items-center py-50 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32'>
      <Title 
        title='Featured Vehicles' 
        subTitle='Browse top quality vehicles available at affordable rates for your journeys.'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
        {featuredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/cars');
          window.scrollTo(0, 0);
        }}
        className='mt-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-full transition duration-300 shadow-md flex items-center gap-2'
      >
        Explore More Cars
        <img src={assets.arrow_right_icon} alt="arrow" className='w-4 h-4' />
      </button>
    </div>
  );
};

export default FeaturedSection;
