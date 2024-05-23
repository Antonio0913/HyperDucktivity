import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  SignUpButton
} from "@clerk/clerk-react";
import ProfileIcon from "../assets/ProfileIcon.png";
import SettingsIcon from "../assets/SettingsIcon.png";
import LogoutIcon from "../assets/LogoutIcon.png";
import NewCategory from "../components/NewCategory";
import CategoryItem from "../components/CategoryItem";

const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <>
      <div className="absolute top-0 left-0">
        <div className="flex items-center space-x-4">
          <h1 className="text-background-gray">
            HyperDucktivity
          </h1>
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
          <Link to="/taskPage">View TaskPage</Link>
        </nav>
        <br />

        <br />
        <header>
          <SignedOut>
            <SignInButton />
            <SignUpButton style={{ marginLeft: "10px" }} />
            <p>User is not signed in</p>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <p>User is signed in</p>
            {isLoaded && user && (
              <p>Clerk User ID: {user.id}</p>
            )}
          </SignedIn>
        </header>
      </div>
      <div className="absolute bottom-0 left-0 flex items-center space-x-4">
        <button>
          <img
            src={ProfileIcon}
            alt="Profile Icon"
            className="w-31 h-17"
          />
        </button>
        <Link to="/settings">
          <img
            src={SettingsIcon}
            alt="Settings Icon"
            className="w-31 h-17"
          />
        </Link>
        <img
          src={LogoutIcon}
          alt="Logout Icon"
          className="w-31 h-17"
        />
      </div>
      <NewCategory />
    </>
  );
};

export default Home;
