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
          backgroundColor: "#2A9D8F",
          color: "white",
          width: "100%",
          borderRadius: "26px",
          padding: "15px",
        }}
        InputProps={{
          // This will remove the underline
          sx: {
            "&:before": {
              borderBottom: "none",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
          },
        }}
      />
    </Box>
  );
};

export default TextFieldProfile;
