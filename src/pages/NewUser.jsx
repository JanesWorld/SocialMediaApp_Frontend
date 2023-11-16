import { Box, Button, Container } from "@mui/material";
import React from "react";

const NewUser = () => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container
        className="newAccountButton"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: "30px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#654C4F",
            color: "white",
            borderRadius: 2,
            ":hover": {
              bgcolor: "#CEC075",
              color: "black",
            },
          }}
        >
          Create New Account
        </Button>
      </Container>
      <Container
        className="infoApp"
        sx={{ padding: "10px", minHeight: "300px" }}
      >
        Information about App
      </Container>
      <Container
        className="examplePicturesApp"
        sx={{
          backgroundColor: "lightgrey",
          minHeight: "300px",
          padding: "10px",
        }}
      >
        Pictures
      </Container>
    </Box>
  );
};

export default NewUser;
