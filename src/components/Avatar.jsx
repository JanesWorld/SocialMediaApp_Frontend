import { Avatar, ButtonBase } from "@mui/material";
import React from "react";

const AvatarProfile = ({ image, size, userName }) => {
  const sizes = {
    small: 50,
    large: 150,
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const imageSrc = image ? process.env.PUBLIC_URL + image : "";
  console.log(imageSrc);
  return (
    <Avatar
      src={imageSrc}
      sx={{
        width: size ? sizes[size] : sizes.small,
        height: size ? sizes[size] : sizes.small,
        backgroundColor: "black",
      }}
      alt="User Avatar"
    >
      {!image && userName ? getInitials(userName) : null}
    </Avatar>
  );
};

export default AvatarProfile;
