import React from "react";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-white">
      <Link to="/" className="text-xl font-bold text-blue-600">
        CarRental
      </Link>
      <nav>
        <Link
          to="/dashboard"
          className="text-gray-600 hover:text-blue-600 font-semibold"
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default NavbarOwner;
