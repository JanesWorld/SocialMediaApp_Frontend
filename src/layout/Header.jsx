import React, { useState } from "react";
import { Grid, Container, Button } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import LogInDialog from "../components/LoginDialog";

const Header = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const closeLoginDialog = () => {
    setShowLoginDialog(false);
  };
  return (
    <Container
      sx={{
        backgroundColor: "white",
        minHeight: "50px",
        maxHeight: "80px",
        paddingTop: "5px",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <h1
            style={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            Link Up
          </h1>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {isLoggedIn ? (
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderWidth: "1px",
                borderColor: "#1E555C",
                backgroundColor: "#1E555C",
                color: "white",
                "&:hover": {
                  backgroundColor: "#F15152",
                  color: "white",
                  borderColor: "#F15152",
                },
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => setShowLoginDialog(true)}
              sx={{
                borderWidth: "1px",
                borderColor: "#1E555C",
                backgroundColor: "#1E555C",
                color: "white",
                "&:hover": {
                  backgroundColor: "#F15152",
                  color: "white",
                  borderColor: "#F15152",
                },
              }}
            >
              Log In
            </Button>
          )}
          {showLoginDialog && (
            <LogInDialog
              onClose={() => setShowLoginDialog(false)}
              closeDialog={closeLoginDialog}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
