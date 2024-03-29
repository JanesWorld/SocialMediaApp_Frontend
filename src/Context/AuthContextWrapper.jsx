import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

const AuthProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export default AuthProviderWithNavigate;
