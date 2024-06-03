import React, { useState } from "react";
import { addAuthHeader } from "../utilities/AuthHelper";

function SignUpPage(props) {
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
    signupUser(creds).then(() =>
      setCreds({ username: "", pwd: "" })
    );
  };

  const signupUser = async (creds) => {
    const promise = fetch(`http://localhost:8000/jwtregister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => {
            localStorage.setItem("authToken", payload.token);
            setMessage(
              `Signup successful for user: ${creds.username}; auth token saved`
            );
          });
        } else {
          response.json().then((data) => {
            setMessage(
              `Signup Error ${response.status}: ${data.message}`
            );
          });
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  };

  const testProtectedRoute = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/testingjwt`,
        {
          method: "GET",
          headers: addAuthHeader({
            "Content-Type": "application/json"
          })
        }
      );

      console.log(response);
    } catch (error) {
      setMessage(`Signup Error: ${error}`);
    }
  };

  return (
    <div>
      <div>
        <button onClick={testProtectedRoute}>
          Test Protected Route
        </button>
      </div>
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
          value={props.buttonLabel || "Sign Up"}
          onClick={submitForm}
        />
      </form>
    </div>
  );
}

export default SignUpPage;
