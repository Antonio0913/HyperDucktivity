import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./routes/Home.jsx";
import Settings from "./routes/Settings.jsx";
import TaskPage from "./routes/TaskPage.jsx";
import TestAuthPage from "./routes/TestAuthPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";

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
      path: "/taskPage/:categoryId",
      element: <TaskPage /> // This will be the main task page after backend is set up
    },
    {
      path: "/settings",
      element: <Settings />
    },
    {
      path: "/sign-in",
      element: <RedirectToSignIn />
    },
    {
      path: "*",
      element: <Home />
    },
    {
      path: "testauthpage",
      element: <TestAuthPage />
    },
    {
      path: "login",
      element: <LoginPage />
    }
  ]);

  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}

export default App;
