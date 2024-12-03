import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        credentials
      );

      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      const decodedToken = jwtDecode(access);

      console.log(decodedToken);
      setIsAuthenticated(true);
      setCurrentUser({
        userId: decodedToken.user_id,
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (user) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        user
      );
      setIsAuthenticated(true);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setCurrentUser({
          userId: decodedToken.user_id,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
