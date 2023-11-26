import React from "react";
import { Grid, Container, Button, Typography } from "@mui/material";

const Header = () => {
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
          <Button
            variant="outlined"
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
