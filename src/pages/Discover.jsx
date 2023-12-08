import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItem,
  Paper,
  Typography,
  ButtonBase,
  Grid,
  ListItemText,
  CardMedia,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchNews from "../components/Trending";
import axiosInstance from "../Authentication/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const Discover = ({ onUserSelect }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const handleUserClick = (userId) => {
    if (typeof onUserSelect === "function") {
      onUserSelect(userId);
    } else {
      console.error("onUserSelect is not a function");
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/core/api/suggested-users/")
      .then((response) => {
        setSuggestedUsers(response.data);
        console.log("Suggested Users", response.data);
      })
      .catch((error) => console.error("Error fetching suggested users", error));
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const latestNews = await fetchNews();
        setNews(latestNews);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };
    loadNews();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={discoverStyle.h4Styles}>
        Discover
      </Typography>
      <Typography variant="h6" sx={discoverStyle.h6Styles}>
        Suggested Users
      </Typography>
      <List>
        <Grid container spacing={2}>
          {suggestedUsers.map((user) => {
            const avatarUrl = `http://127.0.0.1:8000${user.avatar}`;
            console.log("avatar:", user.avatar);
            return (
              <Grid item xs={4} key={user.id}>
                <ButtonBase
                  onClick={() => handleUserClick(user.id)}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} sx={{ color: "black" }} />
                  </ListItem>
                </ButtonBase>
              </Grid>
            );
          })}
        </Grid>
      </List>
      <Typography variant="h6" sx={discoverStyle.h6Styles}>
        Breaking News{" "}
      </Typography>
      <Grid container spacing={2} mt={1}>
        {news.slice(0, 4).map((article, index) => (
          <Grid item xs={6} key={index}>
            <ButtonBase
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", textAlign: "left" }}
            >
              <Paper
                elevation={2}
                sx={{ padding: 2, marginBottom: 2, width: "100% " }}
              >
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    image={article.urlToImage}
                    alt={article.title}
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                      marginBottom: 2,
                    }}
                  />
                )}
                <Typography variant="subtitle1" color="black" gutterBottom>
                  {article.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  gutterBottom
                  backgroundColor="lightgrey"
                  width="50%"
                >
                  {article.author}
                </Typography>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Discover;

const discoverStyle = {
  h4Styles: {
    color: "black",
    fontWeight: "bold",
  },
  h6Styles: {
    color: "black",
    fontWeight: "bolder",
  },
};
