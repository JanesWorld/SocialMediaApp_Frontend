import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useAuth } from "../Context/AuthContext";

const NewAccount = () => {
  let navigate = useNavigate();
  const { handleLogin } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const hasErrors = Object.keys(formErrors).some((key) => formErrors[key]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters, include a number and a special character";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/core/api/check-availability/`, {
        username: formData.username,
        email: formData.email,
      })
      .then((response) => {
        if (!response.data.usernameAvailable) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            username: "Username is already taken",
          }));
        } else if (!response.data.emailAvailable) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email registered. Please log in",
          }));
        } else {
          // Perform the actual registration
          axios
            .post(`${process.env.REACT_APP_API_URL}/core/api/register/`, {
              username: formData.username,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            })
            .then((res) => {
              handleLogin(formData.username, formData.password);
              navigate("/user");
            })
            .catch((error) => {
              console.error("Error during registration", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking availability", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="black">
          Create New Account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {hasErrors && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              Please correct the errors before submitting.
            </Alert>
          )}
          <TextField
            id="username"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!formErrors.username}
            helperText={formErrors.username}
          />
          <TextField
            id="firstName"
            required
            fullWidth
            label="First Name"
            name="firstName" // Corrected name
            autoComplete="firstName"
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />
          <TextField
            id="lastName"
            required
            fullWidth
            label="Last Name"
            name="lastName" // Corrected name
            autoComplete="lastName"
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
          <TextField
            id="email"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            id="password"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <TextField
            id="confirmPassword"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#1E555C",
              color: "white",
              borderColor: "#1E555C",
              borderWidth: "1px",
              borderRadius: "35px",
              "&:hover": {
                bgcolor: "#F15152",
                color: "white",
                borderColor: "#F15152",
              },
            }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewAccount;
