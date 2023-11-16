import { Box, Container, Grid } from "@mui/material";
import React from "react";
import AvatarProfile from "./Avatar";

const Posts = ({ imageUrl, userName, postText }) => {
  return (
    <Container sx={{ pt: 1 }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <AvatarProfile imageUrl={imageUrl} size="small" userName={userName} />
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              backgroundColor: "#A61C3C",
              color: "white",
              minWidth: "50%",
              borderRadius: "33px",
              minHeight: "auto",
            }}
          >
            <p style={{ padding: "10px" }}> {postText}</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Posts;
