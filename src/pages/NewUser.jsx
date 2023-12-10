import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  let navigate = useNavigate();
  const handleCreateAccountClick = () => {
    navigate("/create-account");
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "75vh",
          backgroundImage: "url(path_to_your_hero_image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: "black" }}>
          Connect with the World
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ maxWidth: "500px", textAlign: "center", color: "black" }}
        >
          Join the community to share and discover amazing moments around the
          globe.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 7,
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
          onClick={handleCreateAccountClick}
        >
          Join
        </Button>
      </Box>
    </Box>
  );
};

export default NewUser;
