import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { startAddingMuscle } from "../../actions/muscles.action";
import { setSnackbar } from "../../actions/snackbar.action";
import { InputFile } from "../ui/InputFile";

export const AddMuscle = () => {
  // console.log("render <addMuscle/>");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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

      <div className="m-y--1">
        <InputFile id="image" name="image" />
      </div>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        className="m-t--2"
      >
        <Button
          variant="contained"
          color="info"
          onClick={() => dispatch(setModal(false))}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          loadingPosition="end"
          variant="contained"
          endIcon={<SaveIcon />}
          color="success"
          type="submit"
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  );
};
