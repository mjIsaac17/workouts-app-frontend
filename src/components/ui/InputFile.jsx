import { Stack, Button, InputLabel } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const InputFile = ({ id, name, currentImageName }) => {
  const [newImageName, setNewImageName] = useState(
    currentImageName ? currentImageName : "No image selected"
  );
  return (
    <label htmlFor="image">
      <Stack direction="row" alignItems="center">
        <input
          id={id}
          name={name}
          onChange={(e) => setNewImageName(e.target.files[0].name)}
          type="file"
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          color="info"
          component="span"
          sx={{ marginRight: "1rem" }}
        >
          Select image
        </Button>
        <InputLabel>{newImageName}</InputLabel>
      </Stack>
    </label>
  );
};

InputFile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};
