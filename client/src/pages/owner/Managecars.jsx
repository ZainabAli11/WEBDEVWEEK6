import React, { useEffect, useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';
import Title from '../../components/owner/Title';

const Managecars = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [cars, setCars] = useState([]);

  const fetchOwnersCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnersCars();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Cars" subTitle="Manage your cars data" />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor text-gray-500">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="w-12 h-12 aspect-square rounded-md object-cover"
                  />
                  <p className="font-medium max-md:hidden">
                    {car.brand} {car.model}
                  </p>
                </td>

                <td className="p-3 max-md:hidden">
                  <p>{car.year} - {car.location}</p>
                  <p className="text-xs text-gray-400">{car.fuel_type}, {car.category}</p>
                </td>

                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                <td className="p-3 flex gap-2 items-center">
                  <img
                    src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                    alt=""
                    className="cursor-pointer w-5 h-5"
                    title={car.isAvailable ? 'Set Unavailable' : 'Set Available'}
                  />
                  <img
                    src={assets.delete_icon}
                    alt="Delete"
                    className="cursor-pointer w-5 h-5"
                    title="Delete Car"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managecars;
