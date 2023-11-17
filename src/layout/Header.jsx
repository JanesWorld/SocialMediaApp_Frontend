import React from "react";
import { Grid, Container, Button, Typography } from "@mui/material";

const Header = () => {
  return (
    <Container
      sx={{
        backgroundColor: "black",
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
          <h3 style={{ color: "white", fontWeight: "bold" }}>Link Up</h3>
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
              borderColor: "#2C3D55",
              color: "#EBF5EE",
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
