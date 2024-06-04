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
import SignUpPage from "./routes/SignUpPage.jsx";
import ProtectedRoute from "./utilities/ProtectedRoute.jsx";
import { AuthProvider } from "./utilities/AuthContext.jsx";

function App() {
  // Add new routes here
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<Home />} />
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<Home />} />
    },
    {
      path: "/taskPage",
      element: <ProtectedRoute element={<TaskPage />} />
    },
    {
      path: "/taskPage/:categoryId",
      element: <ProtectedRoute element={<TaskPage />} /> // This will be the main task page after backend is set up
    },
    {
      path: "/settings",
      element: <ProtectedRoute element={<Settings />} />
    },
    {
      path: "/sign-in",
      element: <ProtectedRoute element={<RedirectToSignIn />} />
    },
    {
      path: "*",
      element: <ProtectedRoute element={<Home />} />
    },
    {
      path: "testauthpage",
      element: <ProtectedRoute element={<TestAuthPage />} />
    },
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: "signup",
      element: <SignUpPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
