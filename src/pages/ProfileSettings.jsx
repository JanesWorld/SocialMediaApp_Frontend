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
  Avatar,
} from "@mui/material";
import axiosInstance from "../Authentication/axiosInterceptor";

const ProfileSettings = ({ onSaveSettings, username, onAvatarChange }) => {
  const switchStyles = {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#1E555C",
      "& + .MuiSwitch-track": {
        backgroundColor: "#1E555C",
      },
    },
  };

  const [avatar, setAvatar] = useState(null);
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const profileLink = `linkup/profile/${username.replace(/\s+/g, "_")}`;

  useEffect(() => {
    axiosInstance
      .get("/core/api/profile/")
      .then((response) => {
        const userProfile = response.data;
        setTheme(userProfile.theme);
        setEmailNotifications(userProfile.email_notifications);
        setAvatar(userProfile.profile_pic); // Set the existing avatar
      })
      .catch((error) => console.error("Error fetching profile", error));
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  const handleEmailNotifications = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const saveSettings = () => {
    const formData = new FormData();
    formData.append("theme", theme);
    formData.append("email_notifications", emailNotifications);
    if (avatar instanceof File) {
      formData.append("profile_pic", avatar);
      onAvatarChange(URL.createObjectURL(avatar));
    }

    return axiosInstance
      .put("/core/api/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Profile updated", response.data);
        // Update the avatar URL after successful upload
        if (avatar instanceof File) {
          onAvatarChange(URL.createObjectURL(avatar));
        } else {
          onAvatarChange(response.data.profile_pic);
        }
        onSaveSettings();
      })
      .catch((error) => console.error("Error Profile Settings", error));
  };

  return (
    <Grid container display="flex" flexDirection="column">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ color: "black", fontWeight: "bolder" }}>
          My Profile
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "black", marginTop: "10px", paddingTop: "10px" }}
        >
          <a
            href={profileLink}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            {profileLink}
          </a>
        </Typography>
      </Grid>
      <Divider />
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={6}>
          <Typography sx={{ color: "black" }}>Dark Theme</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormControlLabel
              label="Dark Theme"
              control={
                <Switch
                  id="theme-control"
                  sx={switchStyles}
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                />
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ color: "black" }}>Email Notifications</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            label="Email Notifications"
            control={
              <Switch
                id="email-control"
                sx={switchStyles}
                checked={emailNotifications}
                onChange={handleEmailNotifications}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={6}>
          <Typography sx={{ color: "black" }}>Profile Picture</Typography>
        </Grid>
        <Grid item xs={6}>
          <input type="file" onChange={handleAvatarChange} accept="image/*" />
          {avatar instanceof File ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Avatar"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <Avatar
              src={avatar}
              alt="user-avatar"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ marginTop: "15px" }}
        >
          <Button
            onClick={saveSettings}
            variant="contained"
            sx={{
              backgroundColor: "#1E555C",
              "&:hover": {
                backgroundColor: "#F15152",
                color: "white",
                borderColor: "#F15152",
              },
            }}
          >
            Save Settings
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileSettings;
