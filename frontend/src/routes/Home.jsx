import React from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../assets/ProfileIcon.png"
import SettingsIcon from "../assets/SettingsIcon.png"
import LogoutIcon from "../assets/LogoutIcon.png"

const Home = () => {
  return (
    <>
    <div className="absolute top-0 left-0">
      <div className="flex items-center space-x-4">
      <h1 className="text-background-gray">HyperDucktivity</h1>
      <div>
        <p className="text-beak-yellow">
          {" "}
          _<br />
          &#62;(.)__
          <br />
          &#40;___/
          <br />
          <br />
        </p>
      </div>
      </div>
      <nav>
        <Link to="/categories">View Todo Categories</Link>
      </nav>
      <nav>
        <Link to="/taskPage">View TaskPage</Link>
      </nav>
    </div>
    <div className="absolute bottom-0 left-0 flex items-center space-x-4">
    <button>
      <img src={ProfileIcon} alt="Profile Icon" className="w-31 h-17" />
    </button>
    <Link to="/settings">
      <img src={SettingsIcon} alt="Settings Icon" className="w-31 h-17" />
    </Link>
      <img src={LogoutIcon} alt="Logout Icon" className="w-31 h-17" />
    </div>
    </>
  );
};

export default Home;
