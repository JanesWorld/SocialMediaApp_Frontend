import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Button,
  Collapse,
  Avatar,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { DeleteOutline } from "@mui/icons-material";

const MomentsCard = ({
  moment,
  onLike,
  liked,
  onCommentSubmit,
  comments,
  toggleComments,
  onDeleteComment,
  showComments,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (commentText.trim() !== "") {
      onCommentSubmit(moment.id, commentText);
      setCommentText("");
    }
  };

  return (
    <Box>
      <Card sx={{ display: "flex", marginBottom: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={`${process.env.REACT_APP_API_URL}${moment.image_content}`}
          alt={moment.text_content}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <CardContent>
            <Typography component="div" variant="h6">
              {moment.text_content}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              mb: 2,
            }}
          >
            <IconButton onClick={() => onLike(moment.id)}>
              <FavoriteIcon sx={{ color: liked ? "#F15152" : "default" }} />
            </IconButton>
            {moment.likes} Likes
            <IconButton onClick={() => toggleComments(moment.id)}>
              <CommentIcon />
            </IconButton>
            {comments.length} Comments
          </Box>
        </Box>
      </Card>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ margin: "0 16px", marginBottom: 2 }}>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              size="small"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add comment"
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1E555C",
                color: "white",
                borderRadius: "35px",
                "&:hover": {
                  bgcolor: "#F15152",
                  color: "white",
                },
              }}
            >
              Post
            </Button>
          </form>
          {comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <IconButton
                onClick={() => onDeleteComment(comment.id, moment.id)}
              >
                <DeleteOutline />
              </IconButton>

              <Avatar sx={{ width: 30, height: 30, mr: 1 }} />
              <Typography color="black">{comment.content}</Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default MomentsCard;
