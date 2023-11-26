import { Avatar, ButtonBase } from "@mui/material";
import React from "react";

const AvatarProfile = ({ image, size, userName, onClick }) => {
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
  return (
    <ButtonBase onClick={onClick} style={{ borderRadius: "50%" }}>
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
    </ButtonBase>
  );
};

export default AvatarProfile;
