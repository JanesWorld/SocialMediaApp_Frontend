import { Container, Box } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#2C3D55" }}>
      <Container className="appHeader">
        <Header />
      </Container>
      <Container
        sx={{ flexGrow: 1, minHeight: "600px", paddingBottom: "350px" }}
      >
        {children}
      </Container>
      <Container className="appFooter">
        <Footer />
      </Container>
    </Box>
  );
};

export default AppLayout;
