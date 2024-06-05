import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider
} from "@mui/material/styles";
import { useAuth } from "../utilities/AuthContext.jsx";
import DuckLogo from "../assets/DuckLogo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Hyperducktivity {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb4910"
    },
    secondary: {
      main: "#f44336"
    },
    background: {
      default: "#242424"
    }
  }
});

export default function SignIn() {
  const [creds, setCreds] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await loginUser(creds);
    if (success) {
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
        navigate("/home");
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
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
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
          <Avatar sx={{ m: 1, bgcolor: "#3f51b5" }}>
            <img
              src={DuckLogo}
              alt="Duck Logo"
              style={{ width: "100%" }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={creds.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pwd"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={creds.pwd}
              onChange={handleChange}
            />
            {message && (
              <Typography color="error">{message}</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
            >
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
