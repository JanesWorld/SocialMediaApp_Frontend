import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EventsCalendar from "../components/Calendar";
import EventModal from "../components/EventModal";

const CommunityDetail = ({ community }) => {
  const communityName = community.name;
  const communityDescription = community.description;
  const communityEvents = community.events;
  const communityPosts = community.posts;
  const communityInfo = community.contactInfo;
  const communityGallery = community.gallery;
  const communityMembers = community.members;

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState(community.members || 0);

  if (!community) {
    return <div style={{ color: "black" }}>Community not found</div>;
  }
  console.log(`Community object in detail:`, community);

  const handleDateSelect = (event) => {
    setSelectedEvent([event]);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleMembership = () => {
    setIsMember((current) => {
      setMemberCount((prevCount) => (current ? prevCount - 1 : prevCount + 1));
      return !current;
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <Typography sx={communityStyling.headers}>{communityName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={communityStyling.joinButton}
            onClick={handleMembership}
          >
            {isMember ? "Leave Group" : "Join Group"}
          </Button>
        </Grid>
      </Grid>
      <Typography sx={communityStyling.subtitle}>
        {communityDescription}
      </Typography>
      <Typography sx={{ color: "#F15152", mb: "10px" }}>
        Members: {memberCount}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography sx={communityStyling.body}>
              Recent Posts from {communityName}
            </Typography>
            <List>
              {communityPosts &&
                communityPosts.map((post) => (
                  <ListItem key={post.id}>
                    <ListItemText primary={post.content} />
                  </ListItem>
                ))}
            </List>
          </Paper>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <Typography sx={communityStyling.body}>Gallery</Typography>
            {communityGallery.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Gallery item ${index}`}
                sx={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography sx={communityStyling.body}>Upcoming Events</Typography>
            <Box
              sx={{
                height: 300,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EventsCalendar
                events={community.events}
                onDateSelect={handleDateSelect}
              />
              {showEventModal && (
                <EventModal event={selectedEvent} onClose={handleCloseModal} />
              )}
            </Box>
            <List>
              {communityEvents.map((event) => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography sx={communityStyling.body}>
              How to Contact Us
            </Typography>
            {communityInfo &&
              communityInfo.map((info) => (
                <>
                  <Typography>Email: {info.email}</Typography>
                  <Typography>Phone: {info.phone}</Typography>
                  <Typography>Location: {info.location}</Typography>
                </>
              ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunityDetail;

const communityStyling = {
  headers: {
    color: "#1E555C",
    fontWeight: "bolder",
    fontSize: "22pt",
  },
  body: {
    color: "#1E555C",
    fontSize: "16pt",
    paddingBottom: "15px",
  },
  subtitle: {
    color: "black",
    fontSize: "12pt",
    marginBottom: "12px",
    width: "60%",
  },
  joinButton: {
    backgroundColor: "#1E555C",
    color: "white",
    float: "right",
    "&:hover": {
      backgroundColor: "#F15152",
      color: "white",
    },
  },
};
