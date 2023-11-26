import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CommunityPage = ({ onCommunitySelect }) => {
  let navigate = useNavigate();
  const communities = [
    { id: "dogs", name: "Dogs" },
    { id: "dobermann", name: "Dobermann" },
    { id: "labrador", name: "Labrador" },
  ];

  const handleCommunityClick = (communityId) => {
    onCommunitySelect("communityDetail", communityId);
    // navigate(`/user/Communities/${communityId}`);
  };

  return (
    <Box>
      <Typography color="black">Communities</Typography>
      <List>
        {communities.map((community) => (
          <ListItem
            key={community.id}
            color="black"
            onClick={() => handleCommunityClick(community.id)}
          >
            <ListItemText
              primary={<Typography color="black">{community.name}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommunityPage;

const discoverStyle = {
  h4Styles: {
    color: "#2a9d8f",
    fontWeight: "bold",
  },
  h6Styles: {
    color: "#2c3d55",
    fontWeight: "bolder",
  },
  body1: {
    color: "black",
  },
};
