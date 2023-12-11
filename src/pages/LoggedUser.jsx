import { Box, Button, ButtonBase, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AvatarProfile from "../components/Avatar";
import TextFieldProfile from "../components/TextField";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";
import Moments from "./Moments";
import Discover from "./Discover";
import CommunityPage from "./Community";
import ProfileSettings from "./ProfileSettings";
import CommunityDetail from "./CommunityDetail";
import axios from "axios";
import axiosInstance from "../Authentication/axiosInterceptor";
import SuggestedUserProfile from "./SuggestedUserProfile";

const LoggedUser = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [currentView, setCurrentView] = useState("default");
  const imageUrl = "/profiletest.jpg";
  const userName = "Bob Smith";
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [selectUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/core/api/profile/")
      .then((response) => {
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (userProfile && userProfile.profile_pic) {
          setAvatarUrl(userProfile.profile_pic);
        }
      })
      .catch((error) => {
        console.error("error getting pics", error);
      });
  }, []);

  const handleAvatarChange = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl);
  };

  const navigationButtons = (view) => ({
    bgcolor: currentView === view ? "#F15152" : "white",
    color: "black",
    borderColor: "#3A2E39",
    borderWidth: "1px",
    borderRadius: "35px",
    width: "60%",
    "&:hover": {
      bgcolor: "#F15152",
      color: "black",
      borderColor: "#3A2E39",
    },
  });
  const handleNavigation = (view, communityId = null) => {
    setCurrentView(view);
    setSelectedCommunityId(communityId);
  };

  const handleProfileSaveSettings = () => {
    setCurrentView("default");
  };

  const handleLogoClick = () => {
    setCurrentView("default");
    navigate("/user");
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setCurrentView("suggestedUser");
  };

  const handlePost = () => {
    if (postText.trim()) {
      const postData = {
        content: postText,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/core/api/posts/`, postData)
        .then((response) => {
          const newPost = {
            id: response.data.id,
            text: response.data.content,
            userName: userName,
            imageUrl: imageUrl,
          };
          setPosts([newPost, ...posts]);
          setPostText("");
        })
        .catch((error) => {
          console.error("Error creating post", error);
        });
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "timeline":
        return <Moments />;
      case "discover":
        return <Discover onUserSelect={handleUserSelect} />;
      case "suggestedUser":
        return <SuggestedUserProfile userId={selectUserId} />;
      case "profile":
        return (
          <ProfileSettings
            onSaveSettings={handleProfileSaveSettings}
            username={userName}
            onAvatarChange={handleAvatarChange}
          />
        );
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
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "35px",
                  borderWidth: "1px",
                  borderColor: "black",
                  "&:hover": {
                    backgroundColor: "#F15152",
                    borderColor: "#F15152",
                    color: "white",
                  },
                }}
                variant="outlined"
                onClick={() => handleNavigation("profile")}
              >
                My Profile
              </Button>
            </Box>
            <TextFieldProfile
              id="say-something"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <Button
              onClick={handlePost}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "35px",
                borderWidth: "1px",
                borderColor: "black",
                marginLeft: "15px",
                marginTop: "10px",
                width: "13%",
                "&:hover": {
                  backgroundColor: "#F15152",
                  borderColor: "#F15152",
                  color: "white",
                },
              }}
            >
              Post
            </Button>
            <Box sx={{ mt: 3, overflowY: "auto", maxHeight: "80vh" }}>
              {posts.map((post) => (
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
            backgroundColor: "#3A2E39",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonBase onClick={handleLogoClick} sx={{ marginTop: "30px" }}>
            <AvatarProfile
              image={avatarUrl}
              size="large"
              userName={userName}
              sx={{ margin: "10px" }}
            />
          </ButtonBase>
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
          sx={{ bgcolor: "#F1F1F1", padding: "10px" }}
        >
          {renderView()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoggedUser;
