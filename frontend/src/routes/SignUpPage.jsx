import React, { useState } from "react";
import { addAuthHeader } from "../utilities/AuthHelper";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage(props) {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitForm = () => {
    signupUser(creds).then(() =>
      setCreds({ username: "", pwd: "" })
    );
  };

  const signupUser = async (creds) => {
    try {
      const response = await fetch(
        `https://hyperducktivity.azurewebsites.net/jwtregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds)
        }
      );

      if (response.status === 201) {
        const payload = await response.json();
        localStorage.setItem("authToken", payload.token);
        localStorage.setItem("username", creds.username);
        setMessage(
          `Signup successful for user: ${creds.username}. Auth token saved`
        );
      } else {
        const data = await response.json();
        setMessage(
          `Signup Error ${response.status}: ${data.message}`
        );
      }
    } catch (error) {
      setMessage(`Signup Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div>Sign Up Page</div>
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
          value={props.buttonLabel || "Sign Up"}
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
          Already have an account?{" "}
          <Link to="/login">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
