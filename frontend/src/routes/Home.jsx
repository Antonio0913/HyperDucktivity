import React, { useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import NewCategory from "../components/NewCategory";
import TaskPage from "./TaskPage";
import { addAuthHeader } from "../utilities/AuthHelper";
import { AuthContext } from "../utilities/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import SettingsDropDown from "../components/settingsDropDown";

const Home = () => {
  const { user, isLoaded } = useUser();
  const { setAuthToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [textSize, setTextSize] = useState(12);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken") === null) {
      navigate("/login");
    }
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (isLoaded && user) {
        const username =
          user.username || user.emailAddresses[0].emailAddress;

        try {
          //Check if the user already exists
          const checkResponse = await fetch(
            `https://hyperducktivity.azurewebsites.net/users/${user.id}`,
            {
              headers: addAuthHeader()
            }
          );
          if (checkResponse.ok) {
            console.log("User already exists in backend.");
            return;
          }

          //If User does not exist, create a new user
          const payload = {
            username,
            password: "dummyPassword",
            clerkUserId: user.id
          };

          console.log("Sending payload:", payload);

          const createResponse = await fetch(
            "https://hyperducktivity.azurewebsites.net/users",
            {
              method: "POST",
              headers: addAuthHeader({
                "Content-Type": "application/json"
              }),
              body: JSON.stringify(payload)
            }
          );

          console.log(
            "Response status:",
            createResponse.status
          );
          console.log(
            "Response body:",
            await createResponse.text()
          );

          if (!createResponse.ok) {
            if (createResponse.status === 409) {
              console.log("User already exists in backend.");
            } else {
              throw new Error(
                "Failed to create user in the backend"
              );
            }
          } else {
            const newUser = await createResponse.json();
            console.log("User created in backend:", newUser);
          }
        } catch (error) {
          console.error(
            "Error creating user in backend:",
            error
          );
        }
      }
    };

    checkAndCreateUser();
  }, [isLoaded, user]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setAuthToken(null);
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-row">
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
          <br />
          <NewCategory onCategoryClick={handleCategoryClick} />
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center space-x-4">
        <SettingsDropDown
          username={username}
          logout={logout}
          textSize={textSize}
          setTextSize={setTextSize}
        />
      </div>

      {selectedCategoryId ? (
        <TaskPage
          categoryId={selectedCategoryId}
          textSize={textSize}
        />
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Home;
