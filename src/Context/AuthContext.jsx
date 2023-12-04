import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../Authentication/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    return axiosInstance
      .post("/core/api/token/", { username, password })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return axiosInstance.get("/core/api/profile/");
      })
      .then((profileResponse) => {
        const userId = profileResponse.data.id;
        localStorage.setItem("userId", userId);
        setIsLoggedIn(true);
        navigate("/user"); // Navigate to /user page after successful login
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/"); // Optional: Navigate to home page after logout
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
