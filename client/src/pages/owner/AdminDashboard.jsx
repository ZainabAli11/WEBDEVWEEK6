import React from "react";

const AdminDashboard = () => {
  const stats = {
    totalCars: 40,
    totalBookings: 150,
    pendingBookings: 20,
    completedBookings: 110,
    recentBookings: 8,
    monthlyRevenue: 1800000,
  };

  const currency = "Rs.";

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>
      <p className="mb-8 text-gray-600">
        Welcome! You are now in the Admin Dashboard at <code>/owner/admin</code>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Cars" value={stats.totalCars} />
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Pending Bookings" value={stats.pendingBookings} highlight="yellow" />
        <StatCard title="Completed Bookings" value={stats.completedBookings} />
        <StatCard title="Recent Bookings" value={stats.recentBookings} />
        <StatCard
          title="Monthly Revenue"
          value={`${currency}${stats.monthlyRevenue.toLocaleString()}`}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, highlight }) => {
  const highlightColors = {
    yellow: "text-yellow-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className={`text-3xl font-bold ${highlightColors[highlight] || ""}`}>{value}</p>
    </div>
  );
};

export default AdminDashboard;
