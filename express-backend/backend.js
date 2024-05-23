import express from "express";
import cors from "cors";
import categoryServices from "./models/category-services.js";
import taskServices from "./models/task-services.js";
import userServices from "./models/user-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await userServices.getUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.addUser({ username, password });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/users/:id', async (req, res) => {
  const id = req.params['id'];
  try {
    const user = await userServices.findUserById(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params['id'];
  try {
    const delUser = await userServices.removeUser(id);
    if (delUser) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

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
  try {
    const taskIdToDel = req.params["id"];
    console.log(taskIdToDel);
    const delTask = await taskServices.removeTask(taskIdToDel);
    if (delTask) {
      res.status(204).send();
    } else {
      res.status(404).send("404, task not found");
    }
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await categoryServices.getCategories();
    res.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/categories", async (req, res) => {
  const { title } = req.body;
  try {
    const category = await categoryServices.addCategory({
      title
    });
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/categories/:id", async (req, res) => {
  try {
    const categoryIdToDel = req.params["id"];
    console.log(categoryIdToDel);
    const delCategory = await categoryServices.removeCategory(
      categoryIdToDel
    );
    if (delCategory) {
      res.status(204).send();
    } else {
      res.status(404).send("404, category not found");
    }
  } catch (error) {
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
