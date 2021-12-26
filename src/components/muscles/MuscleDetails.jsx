import React, { useState } from "react";

import { Delete, Save } from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setModal } from "../../actions/modal.action";
import {
  startDeletingMuscle,
  startUpdatingMuscle,
} from "../../actions/muscles.action";

import { componentsModal } from "../../helpers/componentsModal";
import { renameImage } from "../../helpers/renameImage";

import { ConfirmDelete } from "../ui/ConfirmDelete";
import { InputFile } from "../ui/InputFile";

export const MuscleDetails = () => {
  // console.log("render <MuscleDetails/>");

  const dispatch = useDispatch();

  // selectors
  const currentMuscle = useSelector((state) => state.muscles.current);
  const { isAdmin } = useSelector((state) => state.auth.user);

  // states
  const [error, setError] = useState("");
  const [deleteExercises, setDeleteExercises] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [muscleName, setMuscleName] = useState(currentMuscle.name);

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!muscleName.trim()) {
      setError("Invalid muscle name");
      return;
    }

    const image = document.getElementById("image").files[0];
    currentMuscle.name = muscleName.trim();
    currentMuscle.originalImageName = currentMuscle.imageName;
    currentMuscle.newImage = image;
    if (image) {
      currentMuscle.imageName = renameImage(image.name);
    }
    dispatch(startUpdatingMuscle(currentMuscle));
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
      <form onSubmit={handleSubmit} className="modal-details">
        <div className="modal-details__image-section">
          <img
            src={`../img/muscles/${currentMuscle.imageName}`}
            alt={currentMuscle.imageName}
          />
        </div>
        <div className="modal-details__form-section">
          <div>
            <TextField
              size="small"
              id="muscleName"
              name="muscleName"
              required
              fullWidth
              value={muscleName}
              onChange={(e) => setMuscleName(e.target.value)}
              label="Muscle name"
              helperText={error}
              error={!!error}
              autoFocus
            />
            <InputFile
              id="image"
              name="image"
              currentImageName={currentMuscle.imageName}
            />
          </div>
          <Stack direction="row" justifyContent="space-between">
            {isAdmin && (
              <Button
                variant="contained"
                endIcon={<Delete />}
                color="error"
                size="small"
                onClick={() => handleDeleteMode()}
              >
                Delete
              </Button>
            )}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="info"
                onClick={() => dispatch(setModal(false))}
                size="small"
              >
                Cancel
              </Button>
              {isAdmin && (
                <Button
                  variant="contained"
                  endIcon={<Save />}
                  color="success"
                  type="submit"
                  size="small"
                >
                  Update
                </Button>
              )}
            </Stack>
          </Stack>
        </div>
      </form>
    );
  } else {
    return (
      <>
        <ConfirmDelete
          handleCancel={handleDeleteMode}
          handleDelete={handleDelete}
        >
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
        </ConfirmDelete>
      </>
    );
  }
};
