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

const ProfileSettings = ({ onSaveSettings }) => {
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);

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
          Link to own profile
        </Typography>
      </Grid>
      <Divider />
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={6}>
          <Typography sx={styling.h6Styles}>Application Theme </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Switch
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                />
              }
              label="Dark Theme"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={styling.h6Styles}>Email Notifications</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={emailNotifications}
                onChange={handleEmailNotifications}
              />
            }
            label="Email Notifications"
          />
        </Grid>
      </Grid>

      <Button onClick={saveSettings} variant="contained" sx={{ mt: 3 }}>
        {" "}
        Save Settings
      </Button>
    </Grid>
  );
};

export default ProfileSettings;

const styling = {
  h4Styles: {
    color: "#2c3d55",
    fontWeight: "bolder",
  },
  h6Styles: {
    color: "#2c3d55",
  },
};
