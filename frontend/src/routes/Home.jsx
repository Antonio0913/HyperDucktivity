import React, { useEffect } from "react";
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

  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (isLoaded && user) {
        const username = user.username || user.emailAddresses[0].emailAddress;

        try {
          //Check if the user already exists
          const checkResponse = await fetch(`http://localhost:8000/users/${user.id}`);
          if (checkResponse.ok) {
            console.log('User already exists in backend.');
            return;
          }

          //If User does not exist, create a new user
          const payload = {
            username,
            password: 'dummyPassword',
            clerkUserId: user.id,
          };

          console.log('Sending payload:', payload);

          const createResponse = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          console.log('Response status:', createResponse.status);
          console.log('Response body:', await createResponse.text());

          if (!createResponse.ok) {
            if (createResponse.status === 409) {
              console.log('User already exists in backend.');
            } else {
              throw new Error('Failed to create user in the backend');
            }
          } else {
            const newUser = await createResponse.json();
            console.log('User created in backend:', newUser);
          }
        } catch (error) {
          console.error('Error creating user in backend:', error);
        }
      }
    };

    checkAndCreateUser();
  }, [isLoaded, user]);


  return (
    <>
      <div className="absolute top-2 left-2">
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
        <p>User is signed in</p>
        {isLoaded && user && <p>Clerk User ID: {user.id}</p>}
      </div>

      <div className="absolute bottom-3 left-3 flex items-center space-x-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton style={{ marginLeft: "10px" }} />
          <p>User is not signed in</p>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link to="/settings">
          <img
            src={SettingsIcon}
            alt="Settings Icon"
            className="w-31 h-17"
          />
        </Link>
        {/* <img src={LogoutIcon} alt="Logout Icon" className="w-31 h-17" /> */}
      </div>
      <NewCategory />
    </>
  );
};

export default Home;
