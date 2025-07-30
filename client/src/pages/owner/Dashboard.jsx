import React from "react";

const statsData = [
  { title: "Total Cars", value: 120 },
  { title: "Total Bookings", value: 89 },
  { title: "Pending Bookings", value: 12 },
  { title: "Completed Bookings", value: 75 },
  { title: "Recent Bookings", value: 5 },
  { title: "Monthly Revenue", value: "₨ 1,250,000" },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Owner Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
          >
            <p className="text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
