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

const CommunityDetail = ({ communityId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateSelect = (event) => {
    setSelectedEvent([event]);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const posts = [
    {
      id: 1,
      content:
        "We have an upcoming event in November 2023, all welcome to join. First come, first serve",
    },
    {
      id: 2,
      content: "This time last year, we just got our pup, he's now 1 years old",
    },
    {
      id: 3,
      content:
        "Ever since I attended the 'basic commands' training, I've been excited to walk my dog ",
    },
  ];

  const communityDescription =
    "This is a community about training methods for all different types of dogs, but we specialise in Labradors, Doberman and Cane Corso";
  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState(0);

  const handleMembership = () => {
    setIsMember(!isMember);
    setMemberCount(isMember ? memberCount - 1 : memberCount + 1);
  };

  const gallery = ["./dobberman.jpeg", "./labrador.jpg", "./dogs.jpg"];
  const events = [
    {
      id: 1,
      eventName: "Beginner Guide to Leash Walking",
      eventDate: "30/11/2023",
      eventCost: "Free",
    },
    {
      id: 2,
      eventName: "Basic Commands",
      eventDate: "12/12/2023",
      eventCost: "£30",
    },
  ];
  const contactInfo = {
    email: "info@dogtraining.com",
    phone: "0755272783",
    location: "North Hampton",
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <Typography sx={communityStyling.headers}>
            {communityId.toUpperCase()}
          </Typography>
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
        {memberCount} members
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography sx={communityStyling.body}>
              Recent Posts from {communityId}
            </Typography>
            <List>
              {posts.map((post) => (
                <ListItem key={post.id}>
                  <ListItemText primary={post.content} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {gallery.map((img, index) => (
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
              <EventsCalendar events={events} onDateSelect={handleDateSelect} />
              {showEventModal && (
                <EventModal event={selectedEvent} onClose={handleCloseModal} />
              )}
            </Box>
            <List>
              {events.map((event) => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography sx={communityStyling.body}>Where to Find Us</Typography>
            <Typography>Email: {contactInfo.email}</Typography>
            <Typography>Phone: {contactInfo.phone}</Typography>
            <Typography>Location: {contactInfo.location}</Typography>
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
