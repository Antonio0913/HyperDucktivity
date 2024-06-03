import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "./models/user-services.js";

const creds = [];
const TOKEN_SECRET = "some_random_value_123";

export async function registerUser(req, res) {
  try {
    console.log("User tried to sign up");
    const { username, pwd } = req.body; // from form

    if (!username || !pwd) {
      res.status(400).send("Bad request: Invalid input data.");
    }

    const existingUser = await userServices.findUserByUsername(
      username
    );
    if (existingUser) {
      return res.status(409).send("Username already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);
    const newUser = { username, password: hashedPassword };
    await userServices.addUser(newUser);

    const token = await generateAccessToken(username);
    console.log("Token:", token);
    res.status(201).send({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding user");
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      TOKEN_SECRET,
      { expiresIn: "30d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export async function loginUser(req, res) {
  console.log("user tried to login");
  const { username, pwd } = req.body; // from form
  const retrievedUser = await userServices.findUserByUsername(
    username
  );

  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    const matched = await bcrypt.compare(
      pwd,
      retrievedUser.password
    );
    if (matched) {
      const token = await generateAccessToken(username);
      console.log(`User logged in and jwt is ${token}`);
      return res.status(200).send({ token: token });
    } else {
      // invalid password
      return res.status(401).send("Unauthorized");
    }
  }
}
