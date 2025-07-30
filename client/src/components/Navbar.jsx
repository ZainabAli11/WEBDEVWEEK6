import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets, menuLinks } from "../assets/assets";
import logo from "../assets/black_c_logo.png";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { user, logout, loadingUser, isOwner } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const renderAuthButtons = () => {
    if (loadingUser) return <span className="text-gray-400">Loading...</span>;

    if (user) {
      return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          <span className="font-semibold text-blue-700">
            Welcome, {user.name || user.email}
          </span>
          {!isOwner && <BecomeOwnerButton />}

          <button
            onClick={logout}
            className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => setShowLoginModal(true)}
        className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
      >
        Login / Signup
      </button>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 border-b border-borderColor bg-white text-gray-600 transition-all">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
            <img src={logo} alt="logo" className="h-8 mr-2" />
            Indigo Car Rental
          </Link>

          <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
            <img src={assets.hamburger_icon} alt="menu" className="w-6 h-6" />
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`hover:text-blue-600 font-semibold ${
                  location.pathname === link.path ? "text-blue-600" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search"
                className="py-1.5 pl-3 pr-10 bg-transparent border rounded outline-none placeholder-gray-500"
              />
              <img
                src={assets.search_icon}
                alt="search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              />
            </div>

            {renderAuthButtons()}
          </nav>
        </div>

        {open && (
          <div className="md:hidden flex flex-col px-6 pb-4 gap-4 bg-white border-t border-borderColor">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`hover:text-blue-600 font-semibold ${
                  location.pathname === link.path ? "text-blue-600" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search"
                className="py-1.5 w-full bg-transparent border px-3 rounded placeholder-gray-500"
              />
              <img src={assets.search_icon} alt="search" className="w-5 h-5" />
            </div>

            {renderAuthButtons()}
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Navbar;
