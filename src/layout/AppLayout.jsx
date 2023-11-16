import { Container, Box } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container component="header" className="appHeader">
        <Header />
      </Container>
      <Box
        component="main"
        sx={{ flexGrow: 2, minHeight: "600px", overflowY: "auto" }}
      >
        {children}
      </Box>
      <Container component="footer">
        <Footer />
      </Container>
    </Box>
  );
};

export default AppLayout;
