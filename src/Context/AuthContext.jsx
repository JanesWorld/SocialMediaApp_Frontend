import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../Authentication/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        setUser(userId);
        localStorage.setItem("userId", JSON.stringify(userId));
        setIsLoggedIn(true);
        localStorage.setItem(
          "userProfile",
          JSON.stringify(profileResponse.data)
        );
        navigate("/user");
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
