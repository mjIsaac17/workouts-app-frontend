import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { startAddingMuscle } from "../../actions/muscles.action";
import { setSnackbar } from "../../actions/snackbar.action";

export const AddMuscle = () => {
  console.log("render <addMuscle/>");
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Get muscle data
    const name = document.getElementById("muscleName").value.trim();
    const image = document.getElementById("image").files[0];
    if (!name) {
      setError("Invalid muscle name");
      return;
    }
    if (!image) {
      dispatch(setSnackbar("error", "The image is required", true));
      return;
    }
    dispatch(startAddingMuscle({ name, image }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        size="small"
        id="muscleName"
        name="muscleName"
        required
        fullWidth
        label="Muscle name"
        helperText={error}
        error={!!error}
        autoFocus
      />
      <input type="file" id="image" name="image" className="margin-y-2" />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="contained"
          color="info"
          onClick={() => dispatch(setModal(false))}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<SaveIcon />}
          color="success"
          type="submit"
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};
