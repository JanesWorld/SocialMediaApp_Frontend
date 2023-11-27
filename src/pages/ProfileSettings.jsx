import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";

const ProfileSettings = ({ onSaveSettings, username }) => {
  const switchStyles = {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#1E555C", // Thumb color when checked
      "& + .MuiSwitch-track": {
        backgroundColor: "#1E555C", // Track color when checked
      },
    },
  };
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const profileLink = `linkup/profile/${username.replace(/\s+/g, "_")}`;

  const handleThemeChange = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  const handleEmailNotifications = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const saveSettings = () => {
    console.log("Settings saved!", { theme, emailNotifications });
    onSaveSettings();
  };
  return (
    <Grid container display="flex" flexDirection="column">
      <Grid item xs={12}>
        <Typography variant="h4" sx={styling.h4Styles}>
          My Profile
        </Typography>
        <Typography variant="h8" sx={styling.h6Styles}>
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
          <Typography sx={styling.h6Styles}>Dark Theme </Typography>
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
          <Typography sx={styling.h6Styles}>Email Notifications</Typography>
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
            sx={styling.buttonStyle}
          >
            {" "}
            Save Settings
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileSettings;

const styling = {
  h4Styles: {
    color: "black",
    fontWeight: "bolder",
  },
  h6Styles: {
    color: "black",
    marginTop: "10px",
    paddingTop: "10px",
  },
  buttonStyle: {
    backgroundColor: "#1E555C",
    color: "",
    mt: 3,

    "&:hover": {
      backgroundColor: "#F15152",
      color: "white",
      borderColor: "#F15152",
    },
  },
};
