import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
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
      content: "post1",
    },
    {
      id: 2,
      content: "post2",
    },
    {
      id: 3,
      content: "post3",
    },
  ];

  const communityDescription = "This is a community about dobbermans";

  const gallery = ["./gradday.jpg", "./random1.jpg", "./Profile Picture.jpg"];
  const events = [
    {
      id: 1,
      eventName: "Beginner Guide",
      eventDate: "12/12/2023",
      eventCost: "Free",
    },
    {
      id: 2,
      eventName: "Intermediate ",
      eventDate: "12/12/2024",
      eventCost: "£30",
    },
  ];
  const contactInfo = {
    email: "info@dobberman.com",
    phone: "0755272783",
    location: "North Hampton",
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography sx={communityStyling.headers}>{communityId}</Typography>
      <Typography sx={communityStyling.body}>{communityDescription}</Typography>
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
    color: "#2c3d55",
    fontWeight: "bolder",
    fontSize: "22pt",
  },
  body: {
    color: "#2a9d8f",
    fontSize: "16pt",
    fontWeight: "bold",
    paddingBottom: "15px",
  },
  subtitle: {
    color: "black",
    fontSize: "12pt",
  },
};
