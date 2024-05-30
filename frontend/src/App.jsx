import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./routes/Home.jsx";
import Settings from "./routes/Settings.jsx";
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
      element: <TaskPageForCategory /> // This will be the main task page after backend is set up
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
    }
  ]);

  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}

export default App;
