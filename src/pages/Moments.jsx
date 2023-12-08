import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MomentsCard from "../components/MomentsCard";
import axiosInstance from "../Authentication/axiosInterceptor";

const Moments = () => {
  const [momentsData, setMomentsData] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/core/api/timeline-events/")
      .then((response) => {
        const fetchedMoments = response.data;
        setMomentsData(fetchedMoments);

        const initialLikes = {};
        const initialComments = {};
        fetchedMoments.forEach((moment) => {
          console.log(process.env.REACT_APP_API_URL + moment.image_content);
          initialLikes[moment.id] = moment.likedByCurrentUser;
          initialComments[moment.id] = moment.comments;
        });

        setLikes(initialLikes);
        setComments(initialComments);
      })
      .catch((error) => {
        console.error("Error fetching moments", error);
      });
  }, []);

  const handleLike = (momentId) => {
    const isLiked = likes[momentId];
    setLikes({
      ...likes,
      [momentId]: !isLiked,
    });

    axiosInstance
      .post(`/core/api/timeline-events/${momentId}/like/`, { liked: !isLiked })
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating like status", error);
      });
  };

  const handleCommentSubmit = (momentId, commentText) => {
    axiosInstance
      .post(`/core/api/timeline-events/${momentId}/comments/`, {
        content: commentText,
      })
      .then((response) => {
        setComments({
          ...comments,
          [momentId]: [...(comments[momentId] || []), response.data],
        });
      })
      .catch((error) => {
        console.error("Error submitting comments", error);
      });
  };

  const toggleComments = (momentId) => {
    setShowComments({
      ...showComments,
      [momentId]: !showComments[momentId],
    });
  };

  const handleDeleteComment = (commentId, momentId) => {
    axiosInstance
      .delete(`/core/api/comments/${commentId}/`)
      .then(() => {
        setComments((prevComments) => {
          // Create a new object to trigger state update
          const updatedComments = { ...prevComments };

          // Filter out the deleted comment
          updatedComments[momentId] = updatedComments[momentId].filter(
            (comment) => comment.id !== commentId
          );

          return updatedComments;
        });
      })
      .catch((error) => {
        console.error("Error deleting comment", error);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "black",
          fontWeight: "bold",
          paddingBottom: "30px",
        }}
      >
        Your Friend's Moments
      </Typography>
      {momentsData.map((moment) => (
        <MomentsCard
          key={moment.id}
          moment={moment}
          onLike={() => handleLike(moment.id)}
          liked={likes[moment.id]}
          onCommentSubmit={handleCommentSubmit}
          onDeleteComment={(commentId) =>
            handleDeleteComment(commentId, moment.id)
          }
          comments={comments[moment.id] || []}
          toggleComments={() => toggleComments(moment.id)}
          showComments={showComments[moment.id]}
        />
      ))}
    </Box>
  );
};

export default Moments;
