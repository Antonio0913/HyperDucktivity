import express from "express";
import cors from "cors";
import connectDB from "./database.js";
import categoryServices from "./models/category-services.js";
import taskServices from "./models/task-services.js";
import userServices from "./models/user-services.js";
import {
  authenticateUser,
  loginUser,
  registerUser
} from "./auth.js";

const app = express();
const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(
        `Server started on port ${server.address().port}`
      );
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.log(
          `Port ${port} is already in use, trying another port.`
        );
        const newPort = port + 1; // Increment port number and try again
        server.listen(newPort);
      } else {
        console.error("Failed to start server:", error);
      }
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.get("/users", authenticateUser, async (req, res) => {
  try {
    const users = await userServices.getUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get(
  "/users/:clerkUserId",
  authenticateUser,
  async (req, res) => {
    const clerkUserId = req.params["clerkUserId"];
    try {
      const user =
        await userServices.findUserByClerkUserId(clerkUserId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("User not found.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.post("/users", authenticateUser, async (req, res) => {
  const { username, password, clerkUserId } = req.body;
  console.log("Received request to create user:", req.body);

  if (!username || !password || !clerkUserId) {
    return res.status(400).send({
      message: "Missing username, password, or clerkUserId"
    });
  }

  try {
    const existingUser =
      await userServices.findUserByClerkUserId(clerkUserId);
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User already exists" });
    }
    const user = await userServices.addUser({
      username,
      password,
      clerkUserId
    });
    res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send(error.message);
  }
});

app.get("/users/:id", authenticateUser, async (req, res) => {
  const id = req.params["id"];
  try {
    const user = await userServices.findUserById(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/users/:id", authenticateUser, async (req, res) => {
  const id = req.params["id"];
  try {
    const delUser = await userServices.removeUser(id);
    if (delUser) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/tasks", authenticateUser, async (req, res) => {
  const query = req.query;
  try {
    const result = await taskServices.getTasks(query);
    res.send({ tasks_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.post("/tasks", authenticateUser, async (req, res) => {
  const task = req.body;
  const savedTask = await taskServices.addTask(task);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

app.get("/tasks/:id", authenticateUser, async (req, res) => {
  const id = req.params["id"];
  const result = await taskServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ tasks_list: result });
  }
});

app.delete("/tasks/:id", authenticateUser, async (req, res) => {
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

app.put("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  const { title, content, dueDate, isPriority, isComplete } =
    req.body;

  console.log(
    `Received PUT request to update task with ID: ${id}`
  );

  try {
    const updatedTask = await taskServices.updateTask(id, {
      title,
      content,
      dueDate,
      isPriority,
      isComplete
    });

    if (updatedTask) {
      res.status(200).send(updatedTask);
    } else {
      res.status(404).send("Task not found.");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/categories", authenticateUser, async (req, res) => {
  try {
    const categories = await categoryServices.getCategories();
    res.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post(
  "/categoriesTwo",
  authenticateUser,
  async (req, res) => {
    const { username } = req.body;
    console.log(
      `in post categoreis the username is ${username}`
    );
    try {
      const categories =
        await categoryServices.getCategories(username);
      res.status(200).send(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.post("/categories", authenticateUser, async (req, res) => {
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

app.post(
  "/categoriesForUser",
  authenticateUser,
  async (req, res) => {
    const { title, username } = req.body;
    console.log(
      `The title and username received is "${title}" and "${username}"`
    );
    try {
      const category = await categoryServices.addCategoryThree(
        { title },
        username
      );
      res.status(201).send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

app.delete(
  "/categories/:id",
  authenticateUser,
  async (req, res) => {
    try {
      const categoryIdToDel = req.params["id"];
      console.log(categoryIdToDel);
      const delCategory =
        await categoryServices.removeCategory(categoryIdToDel);
      if (delCategory) {
        res.status(204).send();
      } else {
        res.status(404).send("404, category not found");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get(
  "/categories/:id",
  authenticateUser,
  async (req, res) => {
    const id = req.params["id"];
    const result = await categoryServices.findCategoryById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ category_list: result });
    }
  }
);

app.put(
  "/categories/:id",
  authenticateUser,
  async (req, res) => {
    const id = req.params["id"];
    const { title, color } = req.body;

    console.log(
      `Received PUT request to update category with ID: ${id} and title: ${title}`
    );

    try {
      const updatedCategory =
        await categoryServices.updateCategory(id, {
          title,
          color
        });

      if (updatedCategory) {
        res.status(200).send(updatedCategory);
      } else {
        res.status(404).send("Category not found.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/testingjwt", authenticateUser, (req, res) => {
  console.log("protect route called");
  res.send("Yay! You have access to this route");
});

app.post("/jwtlogin", loginUser);
app.post("/jwtregister", registerUser);
