import React, { useState } from "react";
import { useAuth } from "../utilities/AuthContext.jsx";
import {
  useNavigate,
  Link as RouterLink
} from "react-router-dom";
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
import DuckLogo from "../assets/DuckLogo.png";
import hyperduck_duck from "../assets/hyperduck_duck.png";

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

function SignUpPage(props) {
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();
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
        setAuthToken(payload.token);
        localStorage.setItem("username", creds.username);
        setMessage(
          `Signup successful for user: ${creds.username}. Auth token saved`
        );
        navigate("/home");
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
            <img
              src={hyperduck_duck}
              alt="hyperduck_duck"
              className="w-20 h-20"
            />
          </div>
          <Avatar sx={{ m: 1, bgcolor: "#3f51b5" }}>
            <img
              src={DuckLogo}
              alt="Duck Logo"
              style={{ width: "100%" }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={submitForm}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {message && (
              <Typography
                variant="body2"
                color="error"
                align="center"
              >
                {message}
              </Typography>
            )}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
            >
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
              >
                {"Already have an account? Log in"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUpPage;
