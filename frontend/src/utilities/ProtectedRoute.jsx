// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element }) => {
  const { authToken } = useAuth();

  console.log(`The auth token is ${authToken}`);

  return authToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
