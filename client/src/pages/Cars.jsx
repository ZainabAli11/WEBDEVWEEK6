import React, { useState } from 'react';
import Title from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from '../components/CarCard';

function levenshteinDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

const Cars = () => {
  const [input, setInput] = useState('');

  const filteredCars = dummyCarData.filter((car) => {
    const searchValue = input.toLowerCase().trim();
    if (!searchValue) return true;

    const name = (car.name || '').toLowerCase();
    const model = (car.model || '').toLowerCase();
    const fuel = (car.fuel_type || '').toLowerCase();
    const trans = (car.transmission || '').toLowerCase();
    const year = (car.year || '').toString().toLowerCase();
    const price = (car.price || '').toString().toLowerCase();
    const seats = (car.seats || '').toString().toLowerCase();

    const words = name.split(/[\s\-]/);
    const initials = words.map(w => w[0]).join('').toLowerCase();
    const abbreviation = name.replace(/\s+/g, '').toLowerCase();
    const searchWords = searchValue.split(/\s+/);
    const matchesSearchWords = (field) => searchWords.every(word => field.includes(word));
    const isAbbreviationMatch = searchWords.every(word => abbreviation.includes(word));
    const isFuzzyMatch = (field) => levenshteinDistance(field, searchValue) <= Math.min(2, Math.floor(field.length / 2));

    return (
      matchesSearchWords(name) ||
      matchesSearchWords(model) ||
      fuel.includes(searchValue) ||
      trans.includes(searchValue) ||
      year.includes(searchValue) ||
      price.includes(searchValue) ||
      seats.includes(searchValue) ||
      initials.includes(searchValue) ||
      isAbbreviationMatch ||
      isFuzzyMatch(name) ||
      isFuzzyMatch(model)
    );
  });

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="search" className="w-4.5 h-4.5 mr-2" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="filter" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {filteredCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;