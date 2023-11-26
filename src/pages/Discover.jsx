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

const suggestedUsers = [
  {
    id: 1,
    name: "Tom Hanks",
    avatar: "./avatar2.jpg",
  },
  {
    id: 2,
    name: "Britney Spears",
    avatar: "./avatar3.jpg",
  },
  {
    id: 3,
    name: "Beyonce Carter",
    avatar: "./avatar4.jpg",
  },
];

const Discover = () => {
  const [news, setNews] = useState([]);

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
          {suggestedUsers.map((user) => (
            <Grid item xs={4}>
              <ButtonBase
                key={user.id}
                component="li"
                style={{ width: "100%", textAlign: "left" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    variant="h6"
                    sx={discoverStyle.h6Styles}
                  />
                </ListItem>
              </ButtonBase>
            </Grid>
          ))}
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
