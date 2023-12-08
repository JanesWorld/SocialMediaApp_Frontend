import {
  Avatar,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../Authentication/axiosInterceptor";
import CommunityIcon from "@mui/icons-material/Group"; // Example icon

const SuggestedUserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const savedFollowState = JSON.parse(
      sessionStorage.getItem(`followed-${userId}`)
    );
    if (savedFollowState !== null) {
      setIsFollowing(savedFollowState);
    }
    axiosInstance
      .get(`/core/api/user-profile/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setFollowerCount(response.data.followerCount);
      })
      .catch((error) => console.error("Error fetching user data", error));
  }, [userId]);

  const handleFollow = () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    sessionStorage.setItem(
      `followed-${userId}`,
      JSON.stringify(newFollowState)
    );
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  const avatarUrl = userData.avatar
    ? `http://127.0.0.1:8000${userData.avatar}`
    : "";

  const formatFollowerCount = (number) => {
    if (number < 1000) {
      return number;
    }
    if (number < 1000000) {
      return (number / 1000).toFixed(1) + "K";
    }
    return (number / 1000000).toFixed(1) + "M";
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3, justifyContent: "center" }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <Avatar
            src={avatarUrl}
            sx={{ width: 150, height: 150, mb: 2, mx: "auto" }}
            alt={userData.name}
          />
          <Typography variant="h5" sx={{ color: "black" }}>
            {userData.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ mt: 1, color: "gray", textAlign: "justify" }}
          >
            {userData.bio || "No bio available"}
          </Typography>
          <Button
            variant="contained"
            onClick={handleFollow}
            sx={{
              mb: 2,
              backgroundColor: "#1E555C",
              color: "white",
              "&:hover": {
                backgroundColor: "#F15152",
                color: "white",
                borderColor: "#F15152",
              },
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Typography variant="subtitle1" sx={{ color: "gray" }}>
            Followers: {formatFollowerCount(followerCount)}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ color: "#2a9d8f" }}>
            Communities Involved In
          </Typography>
          <List sx={{ listStyleType: "disc", ml: 3 }}>
            {userData.communities.map((community, index) => (
              <ListItem key={index} sx={{ display: "list-item" }}>
                <ListItemIcon>
                  <CommunityIcon />
                </ListItemIcon>
                <ListItemText primary={community} sx={{ color: "black" }} />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SuggestedUserProfile;
