import { Box, Button, Container, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import AvatarProfile from "../components/Avatar";
import TextFieldProfile from "../components/TextField";
import Posts from "../components/Posts";

const LoggedUser = () => {
  const samplePosts = [
    {
      id: 1,
      text: "FirstPost",
      userName: "Jane Chude",
      imageUrl: "/Profile Picture.JPG",
    },
    {
      id: 2,
      text: "SecondPost",
      userName: "Jane Chude",
      imageUrl: "/Profile Picture.JPG",
    },
    {
      id: 1,
      text: "ThirdPost",
      userName: "Jane Chude",
      imageUrl: "/Profile Picture.JPG",
    },
  ];

  const imageUrl = "/Profile Picture.JPG";
  const userName = "Jane Chude";
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    if (postText.trim()) {
      setPosts([...posts, { text: postText, id: Date.now() }]);
      setPostText("");
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ bgcolor: "blue", height: "100%" }}>
        <Grid
          item
          className="avatarNavigationLeft"
          xs={3}
          sx={{
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <AvatarProfile image={imageUrl} size="large" userName={userName} />
          <Stack
            spacing={2}
            sx={{ width: "100%", mt: 2, alignItems: "center" }}
          >
            <Button sx={navigationButtons}>Timeline</Button>
            <Button sx={navigationButtons}>Mentions </Button>
            <Button sx={navigationButtons}>Collections</Button>
          </Stack>
        </Grid>

        <Grid
          item
          className="contentProfileRight"
          xs={9}
          sx={{ bgcolor: "#e9c46a", padding: "10px" }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              sx={{
                bgcolor: "#654c4f",
                color: "white",
                width: "20%",
                borderRadius: "35",
              }}
            >
              My Profile
            </Button>
          </Box>
          <TextFieldProfile
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <Button onClick={handlePost}>Post</Button>
          <Box sx={{ mt: 3 }}>
            {posts.map((post) => (
              <Posts
                key={post.id}
                imageUrl={post.imageUrl}
                userName={post.userName}
                postText={post.text}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoggedUser;

const navigationButtons = {
  bgcolor: "#A31621",
  color: "white",
  width: "60%",
  "&:hover": {
    bgcolor: "#2C3D55",
    color: "white",
  },
};
