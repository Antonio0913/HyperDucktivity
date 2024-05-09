import express from "express";
import cors from "cors";

import taskServices from "./models/task-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

  
  app.get("/tasks", async (req, res) => {
    const task = req.query["title"];
    try {
      const result = await taskServices.getTasks(task);
      res.send({ tasks_list: result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    }
  });

  app.post("/tasks", async (req, res) => {
    const task = req.body;
    const savedTask = await taskServices.addTask(task);
    if (savedTask) res.status(201).send(savedTask);
    else res.status(500).end();
  });

  app.get("/tasks/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await taskServices.findTaskById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ tasks_list: result });
    }
  });

  app.delete("/tasks/:id", async (req, res) => {
    try{
      const taskIdToDel = req.params["id"];
      console.log(taskIdToDel)
      const delTask = await taskServices.removeTask(taskIdToDel);
      if(delTask){
        res.status(204).send();
      }else{
        res.status(404).send("404, task not found");
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