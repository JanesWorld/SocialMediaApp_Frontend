import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import AvatarProfile from "./Avatar";

const Posts = ({ imageUrl, userName, postText }) => {
  return (
    <Container sx={{ pt: 1 }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={1}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AvatarProfile
              imageUrl={imageUrl}
              size="small"
              userName={userName}
            />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              backgroundColor: "#EDB183",
              color: "black",
              minWidth: "40%",
              maxWidth: "60%",
              borderRadius: "33px",
              minHeight: "auto",
            }}
          >
            <Typography sx={{ padding: "10px" }}> {postText}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Posts;
