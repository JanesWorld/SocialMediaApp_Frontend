import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const CommunityPage = ({ onCommunitySelect }) => {
  const communities = [
    {
      id: "Dog Training Obedience School",
      name: "Dog Training",
      imageUrl: "./dogs.jpg",
      members: 3450,
      tag: "#Dogs",
      gallery: ["./dobberman.jpeg", "./labrador.jpg", "./dogs.jpg"],
      description: "Improve your dog's behaviour through our training",
      contactInfo: [
        {
          email: "info@dogtraining.com",
          phone: "0755272783",
          location: "North Hampton",
        },
      ],
      events: [
        {
          id: 1,
          eventName: "Beginner Guide to Leash Walking",
          eventDate: "30/01/2024",
          eventCost: "Free",
        },
        {
          id: 2,
          eventName: "Basic Commands",
          eventDate: "12/12/2023",
          eventCost: "£30",
        },
      ],
      posts: [
        {
          id: 1,
          content:
            "We have an upcoming event in November 2023, all welcome to join. First come, first serve",
        },
        {
          id: 2,
          content: "Final call to sign up before the Christmas period.",
        },
      ],
    },
    {
      id: "All Things React JS",
      name: "Tech Talk - React",
      imageUrl: "./reactjs.png",
      members: 200,
      tag: "#Tech",
      gallery: ["./learnTech.jpg", "./learnTech2.jpg"],
      description:
        "Start a new career in tech by learning the most popular frontend framework",
      contactInfo: [
        {
          email: "info@techtalk.com",
          phone: "07552727893",
          location: "London, Canary Wharf",
        },
      ],
      events: [
        {
          id: 1,
          eventName: "Beginner Guide to React JS",
          eventDate: "30/01/2024",
          eventCost: "Free",
        },
        {
          id: 2,
          eventName: "All things Hooks",
          eventDate: "12/02/2024",
          eventCost: "£60",
        },
        {
          id: 3,
          eventName: "full Stack: React with Django backend",
          eventDate: "19/06/2024",
          eventCost: "£100",
        },
      ],
      posts: [
        {
          id: 1,
          content:
            "Our Beginners course in ReactJS is now sold out, don't worry, a lot of new events in 2024",
        },
      ],
    },
    {
      id: "The Latest News from Westminister",
      name: "Politics",
      imageUrl: "./gov.png",
      members: 793,
      tag: "#Gov",
      gallery: ["./sunak.jpg", "./westminister.jpg"],
      description: "Westminister news straight into your inbox",
      contactInfo: [
        {
          email: "info@westminister.com",
          phone: "0722272783",
          location: "Westminister, UK",
        },
      ],
      events: [],
      posts: [
        {
          id: 1,
          content:
            "Rishi Sunak has now been announced prime minister of the UK",
        },
        {
          id: 2,
          content: "Debatable questions over how covid was handled by Sunak ",
        },
        {
          id: 3,
          content:
            "Rwandan plan still on the table but Conservative MPs do not agree with its extent ",
        },
      ],
    },
  ];

  // const handleCommunityClick = (community) => {
  //   onCommunitySelect("communityDetail", community);
  // };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography color="black" variant="h4" sx={discoverStyle.h4Styles}>
        Communities
      </Typography>
      <Grid container spacing={3}>
        {communities.map((community) => (
          <Grid item xs={12} sm={6} md={4} key={community.id}>
            <Card sx={{ maxWidth: 345, height: 400 }}>
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
                  onClick={() => {
                    onCommunitySelect("communityDetail", community);
                  }}
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
