import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
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
    {
      id: "Dog Training Obedience School",
      name: "Dog Training",
      imageUrl: "./dogs.jpg",
      tag: "#Dogs",
    },
    {
      id: "All Things React JS",
      name: "Tech Talk - React",
      imageUrl: "./reactjs.png",
      tag: "#Tech",
    },
    {
      id: "How Govt effects our life",
      name: "Politics & Its Impact",
      imageUrl: "./gov.png",
      tag: "#Gov",
    },
  ];

  const handleCommunityClick = (communityId) => {
    onCommunitySelect("communityDetail", communityId);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography color="black" variant="h4" sx={discoverStyle.h4Styles}>
        Communities
      </Typography>
      <Grid container spacing={3}>
        {communities.map((community) => (
          <Grid item xs={12} sm={6} md={4} key={community.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={community.imageUrl}
                alt={community.name}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={discoverStyle.cardName}
                >
                  {community.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {community.tag}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Button
                  size="small"
                  sx={discoverStyle.viewMoreButton}
                  onClick={() => handleCommunityClick(community.id)}
                >
                  View More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityPage;

const discoverStyle = {
  h4Styles: {
    color: "black",
    fontWeight: "bold",
    paddingBottom: "30px",
  },
  h6Styles: {
    color: "#2c3d55",
    fontWeight: "bolder",
  },
  body1: {
    color: "black",
  },
  viewMoreButton: {
    backgroundColor: "#1E555C",
    color: "white",
    width: "50%",
    marginBottom: "15px",
    "&:hover": {
      backgroundColor: "#F15152",
      color: "white",
    },
  },
  cardName: {
    color: "#1E555C",
    fontWeight: "bolder",
  },
};
