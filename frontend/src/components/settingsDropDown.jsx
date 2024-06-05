import React, { useState } from "react";
import SettingsIcon from "../assets/SettingsIcon.png";
import FontSize from "./fontSize";

const SettingsDropDown = ({ username, logout, textSize, setTextSize }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      <img
        src={SettingsIcon}
        alt="Settings Icon"
        className="w-8 h-8 cursor-pointer"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 min-h-relative bg-white text-gray-900 border border-gray-300 rounded-md shadow-lg z-50">
          <div className="block px-4 py-2 text-gray-800 cursor-pointer">
            <strong>{username}</strong>
          </div>
          <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
            Account Settings
          </div>
          <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
            Preferences
          </div>
          <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
            Help
          </div>
          <FontSize textSize={textSize} setTextSize={setTextSize} />
          <div
            className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropDown;
