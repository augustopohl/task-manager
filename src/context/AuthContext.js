import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:5238/api/auth/login",
        credentials
      );
      setIsAuthenticated(true);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:5238/api/auth/register",
        user
      );
      setIsAuthenticated(true);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    // Optionally, make a logout API call if needed
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
