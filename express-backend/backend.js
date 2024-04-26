import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

  
  app.get("/users", async (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    try {
      const result = await userServices.getUsers(name, job);
      res.send({ users_list: result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    }
  });

  app.post("/users", async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });

  app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ users_list: result });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    try{
      const userIdToDel = req.params["id"];
      console.log(userIdToDel)
      const delUser = await userServices.removeUser(userIdToDel);
      if(delUser){
        res.status(204).send();
      }else{
        res.status(404).send("404, User not found");
      }}catch (error) {
        console.error("Error during deletion:", error);
        res.status(500).send("Internal Server Error");
      }
    });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});