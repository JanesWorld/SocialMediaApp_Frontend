import { Box, Button, CardMedia, Container, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const NewUser = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImages = [
    "./joinCommunity.png",
    "./friendsmoments.png",
    "./MainPage.png",
  ];

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? mainImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === mainImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  let navigate = useNavigate();
  const handleCreateAccountClick = () => {
    navigate("/create-account");
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: "30px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#1E555C",
            color: "white",
            borderRadius: 2,
            ":hover": {
              bgcolor: "#F15152",
              color: "white",
            },
          }}
          onClick={handleCreateAccountClick}
        >
          Create New Account
        </Button>
      </Container>
      <Container
        sx={{ padding: "10px", minHeight: "300px", textAlign: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="iframe"
            height="300"
            width="60%"
            src="./promoVid.mp4"
            title="Link Up Video"
            sx={{ borderRadius: "8px" }}
          />
        </Box>
      </Container>
      <Container
        sx={{ padding: "10px", position: "relative", textAlign: "center" }}
      >
        <IconButton
          onClick={goToPrevious}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <img
          src={mainImages[currentImageIndex]}
          alt={`Gallery ${currentImageIndex}`}
          style={{ width: "100%", height: "auto" }}
        />

        <IconButton
          onClick={goToNext}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Container>
    </Box>
  );
};

export default NewUser;
