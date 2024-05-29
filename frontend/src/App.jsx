import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Home from "./routes/Home.jsx";
import Settings from "./routes/Settings.jsx";
import NewTask from "./components/NewTask.jsx";
import FontSize from "./components/fontSize.jsx";
import Task from "./components/Task.jsx";
import TaskPage from "./routes/TaskPage.jsx";
import TaskPageForCategory from "./routes/TaskPageForCategory.jsx";

function App() {
  // Add new routes here
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/taskPage",
      element: <TaskPage />
    },
    {
      path: "/taskPage/:id",
      element: <TaskPage/> // This will be the main task page after backend is set up
    },
    {
      path: "/settings",
      element: <Settings />
    }
    ,
    {
      path: "/sign-in",
      element: <RedirectToSignIn />
    },
    {
      path: "*",
      element: <Home />
    }
  ]);

  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}

export default App;
