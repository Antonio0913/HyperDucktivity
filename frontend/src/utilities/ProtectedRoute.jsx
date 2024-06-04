// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element }) => {
  const { authToken } = useAuth();

  return authToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
