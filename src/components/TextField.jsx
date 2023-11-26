import { Box, TextField } from "@mui/material";
import React from "react";

const TextFieldProfile = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        width: "60%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "35",
        paddingTop: "15px",
        paddingLeft: "10px",
      }}
    >
      <TextField
        value={value}
        onChange={onChange}
        variant="standard"
        placeholder="Say something to your fans.."
        multiline
        minRows={4}
        sx={{
          backgroundColor: "#1E555C",
          width: "100%",
          borderRadius: "26px",
          padding: "15px",
          input: {
            color: "white", // Sets the text color
          },
        }}
        InputProps={{
          disableUnderline: true, // Removes the underline
        }}
        // Directly targeting the placeholder
        inputProps={{
          style: { color: "white" }, // Sets the placeholder text color
        }}
      />
    </Box>
  );
};

export default TextFieldProfile;
