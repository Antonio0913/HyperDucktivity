import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/Home.jsx";
import Categories from "./routes/Categories.jsx";
import Settings from "./routes/Settings.jsx";
import NewTask from "./components/NewTask.jsx";
import FontSize from "./components/fontSize.jsx";
import Task from "./components/Task.jsx";
import TaskPage from "./routes/TaskPage.jsx";

function App() {
  // Add new routes here
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/categories",
      element: <Categories />
    },
    {
      path: "/taskPage",
      element: <TaskPage />
    },
    {
      path: "/settings",
      element: <Settings />
    }
  ]);

  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}

export default App;
