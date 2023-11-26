import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Button,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { ShowChart } from "@mui/icons-material";

const momentsData = [
  {
    id: 1,
    title: "Grad Day",
    imageUrl: "/gradday.jpg",
    description: "I finally did it. After 6 years, I'm officially a med grad!",
  },
  {
    id: 2,
    title: "First Marathon",
    imageUrl: "/marathon.jpg",
    description: "Completed my first marathon. What a feeling!",
  },
  {
    id: 3,
    title: "Trip to Iceland",
    imageUrl: "/iceland.jpg",
    description: "Saw the northern lights for the first time!",
  },
];

const MomentsCard = ({
  moment,
  onLike,
  liked,
  onCommentSubmit,
  comments,
  toggleComments,
  showComments,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    onCommentSubmit(moment.id, comment);
    setComment("");
  };

  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={moment.imageUrl}
        alt={moment.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {moment.title}
          </Typography>
          <Typography
            component="div"
            variant="subtitle1"
            color="text.secondary"
          >
            {moment.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
            <IconButton
              onClick={() => onLike(moment.id)}
              color={liked ? "primary" : "default"}
            >
              <FavoriteIcon />
            </IconButton>
            {moment.likes} Likes
            <IconButton onClick={() => toggleComments(moment.id)}>
              <CommentIcon />
            </IconButton>
            {comments.length} Comments
          </Box>
          {/* <Box>
            <TextField
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button onClick={handleCommentSubmit}>Post</Button>
          </Box>
          {comments.map((c, index) => (
            <Typography key={index}>{c}</Typography>
          ))} */}
        </CardContent>
        <Collapse in={showComments[moment.id]} timeout="auto" unmountOnExit>
          <Box sx={{ marginLeft: 8, marginBottom: 2 }}>
            <TextField
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
              fullWidth
            />
            <Button onClick={handleCommentSubmit}>Post</Button>
            {comments.map((c, index) => (
              <Typography color="black" key={index}>
                {c}
              </Typography>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
};

const Moments = () => {
  const [likes, setLikes] = useState({}); // Stores whether a moment is liked
  const [comments, setComments] = useState({}); // Stores comments for each moment
  const [showComments, setShowComments] = useState({});

  const handleLike = (momentId) => {
    setLikes({
      ...likes,
      [momentId]: !likes[momentId],
    });
  };

  const handleCommentSubmit = (momentId, comment) => {
    const updatedComments = comments[momentId]
      ? [...comments[momentId], comment]
      : [comment];
    setComments({
      ...comments,
      [momentId]: updatedComments,
    });
  };

  const toggleComments = (momentId) => {
    setShowComments({
      ...showComments,
      [momentId]: !showComments[momentId],
    });
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={momentsTitle}>
        Your Friend's Moments
      </Typography>
      {momentsData.slice(0, 3).map((moment) => (
        <MomentsCard
          key={moment.id}
          moment={moment}
          onLike={handleLike}
          liked={likes[moment.id]}
          onCommentSubmit={handleCommentSubmit}
          comments={comments[moment.id] || []}
          toggleComments={toggleComments}
          showComments={showComments}
        />
      ))}
    </Box>
  );
};

export default Moments;

const momentsTitle = {
  color: "#2c3d55",
  pb: 2,
  fontWeight: "bolder",
};
