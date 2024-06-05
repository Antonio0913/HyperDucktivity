import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utilities/AuthContext.jsx";

function LoginPage(props) {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const navigateHome = () => {
    navigate("/home");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitForm = async () => {
    const success = await loginUser(creds);
    if (success) {
      setLoggedIn(true);
      setCreds({ username: "", pwd: "" });
    }
  };

  const loginUser = async (creds) => {
    try {
      const response = await fetch(
        `https://hyperducktivity.azurewebsites.net/jwtlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds)
        }
      );

      if (response.ok) {
        const payload = await response.json();
        setMessage(`Login successful. Auth token saved`);
        console.log(
          "Login successful; auth token saved, navigating to home"
        );
        localStorage.setItem("authToken", payload.token);
        setAuthToken(payload.token);
        localStorage.setItem("username", creds.username);

        // navigate("/home");
      } else {
        setMessage(
          `Login Error ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      setMessage(`Login Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div>Login Page</div>
      <br />
      {message === "" ? <p></p> : <p>{message}</p>}
      <form>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          name="username"
          id="username"
          value={creds.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="pwd"
          id="password"
          value={creds.pwd}
          onChange={handleChange}
        />
        <input
          type="button"
          value={props.buttonLabel || "Log In"}
          onClick={submitForm}
        />
      </form>
      <div>
        {localStorage.getItem("authToken") !== null ? (
          <div>
            <button onClick={navigateHome}>Go to Home</button>{" "}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/signUp">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
