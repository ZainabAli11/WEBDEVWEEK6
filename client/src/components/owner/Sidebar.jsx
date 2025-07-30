import React, { useState } from "react";
import { dummyUserData, assets } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const ownerMenuLinks = [
  { name: "Dashboard", path: "/owner/dashboard", icon: "🏠" },
  { name: "Add Car", path: "/owner/add-car", icon: "➕" },
  { name: "Manage Cars", path: "/owner/manage-car", icon: "🚗" },
  { name: "Manage Bookings", path: "/owner/manage-bookings", icon: "📅" },
];

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState({ ...dummyUserData });
  const [image, setImage] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const updateImage = () => {
    if (image) {
      const newImageUrl = URL.createObjectURL(image);
      setUser((prev) => ({ ...prev, image: newImageUrl }));
      setImage(null);
    }
  };

  const saveName = () => {
    setUser((prev) => ({ ...prev, name: tempName.trim() || "Owner" }));
    setIsEditingName(false);
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-16 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm bg-white">
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-4">
        <label htmlFor="image" className="cursor-pointer block rounded-full overflow-hidden w-24 h-24 relative">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt="profile"
            className="w-24 h-24 object-cover rounded-full"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="mt-2 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer rounded"
          >
            Save <img src={assets.check_icon} width={13} alt="check icon" />
          </button>
        )}

        <div className="mt-4 w-full flex items-center justify-center gap-2">
          {isEditingName ? (
            <>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="border rounded px-2 py-1 text-center text-base max-md:text-sm"
                autoFocus
              />
              <button
                onClick={saveName}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setTempName(user.name);
                  setIsEditingName(false);
                }}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <p
              onClick={() => setIsEditingName(true)}
              className="cursor-pointer text-base max-md:text-sm font-semibold select-none mt-1"
              title="Click to edit name"
            >
              {user?.name || "Owner"}
            </p>
          )}
        </div>
      </div>

      <nav className="w-full mt-10">
        {ownerMenuLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/owner/dashboard"}
            className={({ isActive }) =>
              `relative flex items-center gap-3 w-full py-3 pl-4 transition-all ${
                isActive ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="max-md:hidden">{item.name}</span>
            {location.pathname === item.path && (
              <div className="bg-blue-600 w-1.5 h-8 rounded-r absolute right-0"></div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
