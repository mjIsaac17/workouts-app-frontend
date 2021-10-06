import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import {
  startAddingMuscle,
  startDeletingMuscle,
} from "../../actions/muscles.action";
import { setSnackbar } from "../../actions/snackbar.action";
import { Delete } from "@mui/icons-material";
import { componentsModal } from "../../helpers/componentsModal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText } from "@mui/material";

export const MuscleDetails = () => {
  console.log("render <MuscleDetails/>");
  const dispatch = useDispatch();
  const currentMuscle = useSelector((state) => state.muscles.current);
  const [error, setError] = useState("");
  const [deleteExercises, setDeleteExercises] = useState(null);

  const [deleteMode, setDeleteMode] = useState(false);

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

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    dispatch(
      setModal(
        true,
        !deleteMode ? `Delete muscle "${currentMuscle.name}"` : "Edit muscle",
        componentsModal.muscleItem
      )
    );
  };

  const handleRadioChange = (event) => {
    if (event.target.value === "true") setDeleteExercises(true);
    else setDeleteExercises(false);
    setError("");
  };

  const handleDelete = () => {
    if (deleteExercises === null) {
      setError("Select an option");
      return;
    }
    dispatch(
      startDeletingMuscle(
        currentMuscle.id,
        currentMuscle.imageName,
        deleteExercises
      )
    );
  };

  if (!deleteMode) {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          id="muscleName"
          name="muscleName"
          required
          fullWidth
          value={currentMuscle.name}
          label="Muscle name"
          helperText={error}
          error={!!error}
          autoFocus
        />
        <div className="margin-y-2">
          <label>Current image: {currentMuscle.imageName}</label>
          <img
            style={{ marginTop: "0.5rem" }}
            src={`../img/muscles/${currentMuscle.imageName}`}
            alt={currentMuscle.imageName}
          />
        </div>
        <div className="margin-y-2">
          <label>New image</label>
          <input
            type="file"
            id="image"
            name="image"
            style={{ marginTop: "0.5rem" }}
          />
        </div>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            endIcon={<Delete />}
            color="error"
            type="button"
            onClick={() => handleDeleteMode()}
          >
            Delete
          </Button>
          <Stack direction="row" spacing={2}>
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
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  } else {
    return (
      <>
        <FormControl component="fieldset" error={!!error}>
          <FormLabel component="legend">
            Delete all exercises associated with "{currentMuscle.name}"?
          </FormLabel>
          <RadioGroup
            row
            aria-label="delete muscle exercises"
            onChange={handleRadioChange}
          >
            <FormControlLabel
              id="fclDeleteExercisesNo"
              value={false}
              control={<Radio />}
              label="No"
            />
            <FormControlLabel
              id="fclDeleteExercisesYes"
              value={true}
              control={<Radio />}
              label="Yes"
            />
          </RadioGroup>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            type="button"
            variant="contained"
            color="info"
            onClick={() => handleDeleteMode()}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Accept
          </Button>
        </Stack>
      </>
    );
  }
};
