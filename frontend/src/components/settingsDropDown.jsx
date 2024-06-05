import React, { useState } from "react";
import SettingsIcon from "../assets/SettingsIcon.png";
import FontSize from "./fontSize";
import LogoutIcon from "../assets/logout.svg";
import TextSizeIcon from "../assets/textSize.svg";

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
        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 border border-gray-300 rounded-md shadow-lg z-50">
          <div className="block px-4 py-2 text-gray-800 cursor-pointer">
            <strong>User: {username}</strong>
          </div>
          <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
            <img src={TextSizeIcon} alt="Text Size Icon" className="w-12 h-12" />
            <div className="block px-4 py-2">
              <FontSize textSize={textSize} setTextSize={setTextSize} />
            </div>
          </div>
          <div
            className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 justify-between"
            onClick={logout}
          >
            <img src={LogoutIcon} alt="Logout Icon" className="w-12 h-12" />
            <p className="text-beak-yellow text-right">
              <br />
              &#62;(.)__
              <br />
              &#40;___/
              <br />
              <br />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropDown;
