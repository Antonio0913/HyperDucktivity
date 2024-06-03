import React, { useState } from "react";

function LoginPage(props) {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitForm = () => {
    loginUser(creds).then(() =>
      setCreds({ username: "", pwd: "" })
    );
  };

  const loginUser = async (creds) => {
    try {
      const response = await fetch(
        `http://localhost:8000/jwtlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds)
        }
      );

      if (response.status === 200) {
        const payload = await response.json();
        setToken(payload.token);
        setMessage(`Login successful; auth token saved`);
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
      {message === "" ? (
        <p>This is a message</p>
      ) : (
        <p>{message}</p>
      )}
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
    </div>
  );
}

export default LoginPage;
