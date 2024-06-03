// AuthContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken")
  );

  // move this
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
