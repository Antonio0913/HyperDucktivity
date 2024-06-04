import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
    setIsLoading(false); // Done loading
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
