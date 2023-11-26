import { Container, Grid } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Container
      sx={{
        backgroundColor: "white",
        minHeight: "50px",
        maxHeight: "80px",
        paddingTop: "5px",
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <p style={{ color: "black" }}>
            &copy; 2023 Link Up. All Rights Reserved.
          </p>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            justifyItems: "flex-end",
            justifyContent: "flex-end",
            paddingBottom: "10px",
          }}
        >
          <img src="./LinkUpLogo.png" alt="logo" height="40px" />
        </Grid>
      </Grid>
    </Container>
  );
};
