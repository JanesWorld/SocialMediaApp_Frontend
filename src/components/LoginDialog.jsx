import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAuth } from "../Context/AuthContext";

const LoginDialog = ({ onClose, closeDialog }) => {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password).then(() => {
      closeDialog();
    });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Log In</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Log In</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginDialog;
