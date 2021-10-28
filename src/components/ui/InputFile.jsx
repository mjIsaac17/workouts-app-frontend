import { Stack, Button, InputLabel } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const InputFile = ({ id, name, currentImageName, onChangeFunction }) => {
  const [newImageName, setNewImageName] = useState(
    currentImageName ? currentImageName : "No image selected"
  );
  console.log("render <InputFile/>");
  const handleChange = (e) => {
    setNewImageName(e.target.files[0].name);
    if (onChangeFunction) onChangeFunction();
  };
  return (
    <div className="m-y--1">
      <label htmlFor={name}>
        <Stack direction="row" alignItems="center">
          <input
            id={id}
            name={name}
            onChange={handleChange}
            type="file"
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            color="info"
            component="span"
            size="small"
            sx={{ marginRight: "1rem" }}
          >
            Select image
          </Button>
          <InputLabel>{newImageName}</InputLabel>
        </Stack>
      </label>
    </div>
  );
};

InputFile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};
