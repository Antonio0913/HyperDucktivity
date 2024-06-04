// utilities/AuthContext.jsx
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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
