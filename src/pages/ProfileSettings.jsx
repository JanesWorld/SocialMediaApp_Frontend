import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
  Avatar,
  TextField,
  Stack,
} from "@mui/material";
import axiosInstance from "../Authentication/axiosInterceptor";
import { useAuth } from "../Context/AuthContext";

const ProfileSettings = ({ onSaveSettings, onAvatarChange }) => {
  const { user } = useAuth();
  const defaultAvatar = `${process.env.PUBLIC_URL}/media/avatars/DefaultAvatar.jpg`;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailNotifications: true,
    theme: "light",
    profilePic: defaultAvatar,
  });

  useEffect(() => {
    axiosInstance
      .get("/core/api/profile/")
      .then((response) => {
        console.log("Fetched profile data:", response.data);
        setUserData({
          firstName: response.data.first_name || "",
          lastName: response.data.last_name || "",
          username: response.data.username || "",
          emailNotifications: response.data.email_notifications,
          theme: response.data.theme,
          profilePic: response.data.profile_pic
            ? response.data.profile_pic
            : defaultAvatar,
        });
      })
      .catch((error) => console.error("Error fetching profile", error));
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUserData({ ...userData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserData({ ...userData, profilePic: file });
      onAvatarChange(URL.createObjectURL(file));
    }
  };

  const saveSettings = () => {
    const formData = new FormData();
    formData.append("first_name", userData.firstName);
    formData.append("last_name", userData.lastName);
    formData.append("username", userData.username); // If you allow username changes
    formData.append("theme", userData.theme === "dark" ? "dark" : "light");
    formData.append("email_notifications", userData.emailNotifications);

    if (userData.profilePic instanceof File) {
      formData.append("profile_pic", userData.profilePic);
    }

    axiosInstance
      .put("/core/api/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Profile updated", response.data);
        if (userData.profilePic instanceof File) {
          onAvatarChange(URL.createObjectURL(userData.profilePic));
        }
        onSaveSettings();
      })
      .catch((error) => console.error("Error updating profile", error));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
          Personal Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Profile Picture
              </Typography>
              <Avatar
                src={
                  userData.profilePic
                    ? typeof userData.profilePic === "string" ||
                      userData.profilePic instanceof String
                      ? userData.profilePic
                      : URL.createObjectURL(userData.profilePic)
                    : defaultAvatar
                }
                alt="Profile Avatar"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <input
                type="file"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
          UI Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              label="Dark Theme"
              control={
                <Switch
                  name="theme"
                  checked={userData.theme === "dark"}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "theme",
                        value: e.target.checked ? "dark" : "light",
                      },
                    })
                  }
                />
              }
              sx={{ color: "black" }}
            />
            <FormControlLabel
              label="Email Notifications"
              control={
                <Switch
                  name="emailNotifications"
                  checked={userData.emailNotifications}
                  onChange={handleChange}
                />
              }
              sx={{ color: "black" }}
            />
            <Box mt={2}>
              <Button
                onClick={saveSettings}
                variant="contained"
                sx={{
                  backgroundColor: "#1E555C",
                  "&:hover": {
                    backgroundColor: "#F15152",
                  },
                }}
              >
                Save Settings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileSettings;
