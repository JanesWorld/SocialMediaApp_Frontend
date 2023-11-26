import { Box, Button, ButtonBase, Container, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import AvatarProfile from "../components/Avatar";
import TextFieldProfile from "../components/TextField";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";
import Moments from "./Moments";
import Discover from "./Discover";
import CommunityPage from "./Community";
import ProfileSettings from "./ProfileSettings";
import CommunityDetail from "./CommunityDetail";

const LoggedUser = () => {
  const [currentView, setCurrentView] = useState("default");
  const imageUrl = "/Profile Picture.JPG";
  const userName = "Jane Chude";
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const navigate = useNavigate();

  const navigationButtons = (view) => ({
    bgcolor: currentView === view ? "#DDA3B2" : "white",
    color: "black",
    borderColor: "#DDA3B2",
    borderWidth: "1px",
    borderRadius: "35px",
    width: "60%",
    "&:hover": {
      bgcolor: "#DDA3B2",
      color: "black",
      borderColor: "#DDA3B2",
    },
  });
  const handleNavigation = (view, communityId = null) => {
    console.log("Navigating to", view);
    setCurrentView(view);
    setSelectedCommunityId(communityId);
  };

  const handleProfileSaveSettings = () => {
    setCurrentView("default");
  };

  const handleLogoClick = () => {
    console.log("Navigating to /user");
    setCurrentView("default");
    navigate("/user");
  };

  const renderView = () => {
    switch (currentView) {
      case "timeline":
        return <Moments />;
      case "discover":
        return <Discover />;
      case "profile":
        return <ProfileSettings onSaveSettings={handleProfileSaveSettings} />;
      case "community":
        return <CommunityPage onCommunitySelect={handleNavigation} />;
      case "communityDetail":
        return selectedCommunityId ? (
          <CommunityDetail communityId={selectedCommunityId} />
        ) : (
          <CommunityPage onCommunitySelect={handleNavigation} />
        );
      default:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
              }}
            >
              <Button
                sx={myButtons}
                variant="outlined"
                onClick={() => handleNavigation("profile")}
              >
                My Profile
              </Button>
            </Box>
            <TextFieldProfile
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <Button
              onClick={handlePost}
              sx={{
                paddingTop: "10px",
                paddingLeft: "20px",
                color: "black",
                ":hover": {
                  opacity: 0.6,
                  color: "white",
                },
              }}
            >
              Post
            </Button>
            <Box sx={{ mt: 3, overflowY: "auto", maxHeight: "80vh" }}>
              {latestFourPosts.map((post) => (
                <Posts
                  key={post.id}
                  imageUrl={post.imageUrl}
                  userName={post.userName}
                  postText={post.text}
                />
              ))}
            </Box>
          </>
        );
    }
  };

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        text: postText,
        userName: userName,
        imageUrl: imageUrl,
      };
      setPosts([newPost, ...posts]);
      setPostText("");
    }
  };

  const latestFourPosts = [...posts].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        sx={{
          height: "100%",
          maxWidth: "99%",
          marginLeft: "8px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Grid
          item
          className="avatarNavigationLeft"
          xs={2.5}
          sx={{
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <AvatarProfile
            image={imageUrl}
            size="large"
            userName={userName}
            onClick={handleLogoClick}
          />
          <Stack
            spacing={2}
            sx={{ width: "100%", mt: 2, alignItems: "center" }}
          >
            <Button
              sx={navigationButtons("timeline")}
              variant="outlined"
              onClick={() => handleNavigation("timeline")}
            >
              Moments
            </Button>
            <Button
              sx={navigationButtons("discover")}
              variant="outlined"
              onClick={() => handleNavigation("discover")}
            >
              Discover{" "}
            </Button>
            <Button
              sx={navigationButtons("community")}
              variant="outlined"
              onClick={() => handleNavigation("community")}
            >
              Community
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          className="contentProfileRight"
          xs={9}
          sx={{ bgcolor: "#EBF5EE", padding: "10px" }}
        >
          {renderView()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoggedUser;

const myButtons = {
  backgroundColor: "white",
  color: "black",
  width: "15%",
  borderColor: "#DDA3B2",
  borderWidth: "1px",
  borderRadius: "35px",
  "&:hover": {
    backgroundColor: "#DDA3B2",
    color: "black",
    borderColor: "#DDA3B2",
  },
};
