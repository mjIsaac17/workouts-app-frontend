import { Delete, Save } from "@mui/icons-material";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  startDeletingExercise,
  startUpdatingExercise,
} from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";
import { useForm } from "../../hooks/useForm";
import { ConfirmDelete } from "../ui/ConfirmDelete";
import { InputFile } from "../ui/InputFile";

export const DetailsExercise = () => {
  console.log("render details");
  const dispatch = useDispatch();
  const { urlMuscleId } = useParams();
  const { current } = useSelector((state) => state.exercises);
  const { isAdmin } = useSelector((state) => state.user.user);
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));
  const inputImageName = "newImage";

  const [formValues, handleInputChange, setSpecificValue] = useForm({
    ...current, //it contains the data of the selected exercise
    muscleId: urlMuscleId,
    newImage: null, //image file
  });

  const [deleteMode, setDeleteMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startUpdatingExercise(formValues, urlMuscleId));
  };

  const setNewImage = () => {
    setSpecificValue(
      "newImage",
      document.getElementById(inputImageName).files[0]
    );
  };

  const handleCancelDelete = () => {
    setDeleteMode(false);
  };
  const handleDelete = () => {
    dispatch(startDeletingExercise(formValues.id, formValues.imageName));
  };

  if (!deleteMode)
    return (
      <form onSubmit={handleSubmit} className="modal-details">
        <div className="modal-details__image-section">
          <img
            className="image"
            src={`../img/exercises/${current.imageName}`}
            alt={current.imageName}
          />
        </div>
        <div className="modal-details__form-section">
          <div>
            {isAdmin && (
              <TextField
                size="small"
                label="Exercise Name"
                fullWidth
                name="name"
                onChange={handleInputChange}
                defaultValue={current.name}
              />
            )}

            <TextField
              sx={{ margin: "1rem 0" }}
              size="small"
              name="description"
              fullWidth
              label="Description"
              multiline
              disabled={!isAdmin}
              rows="3"
              onChange={handleInputChange}
              defaultValue={current.description}
            />
            <FormControl fullWidth>
              <InputLabel id="labelMuscleId">Muscle</InputLabel>
              <Select
                id="ddlMuscleAddExercise" //drop down list
                labelId="labelMuscleId"
                label="Muscle"
                size="small"
                defaultValue={
                  !current.muscleId ? urlMuscleId : current.muscleId
                }
                onChange={handleInputChange}
                name="muscleId"
                disabled={!isAdmin}
              >
                {muscleList.map((muscle) => (
                  <MenuItem key={`ddlMuscles-${muscle.id}`} value={muscle.id}>
                    {muscle.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isAdmin && (
              <InputFile
                name={inputImageName}
                id={inputImageName}
                currentImageName={current.imageName}
                onChangeFunction={setNewImage}
              />
            )}
          </div>
          <Stack direction="row" justifyContent="space-between">
            {isAdmin && (
              <Button
                variant="contained"
                endIcon={<Delete />}
                color="error"
                size="small"
                onClick={() => setDeleteMode(true)}
              >
                Delete
              </Button>
            )}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="info"
                onClick={() => dispatch(setModal(false, ""))}
                size="small"
              >
                Close
              </Button>
              {isAdmin && (
                <Button
                  variant="contained"
                  endIcon={<Save />}
                  color="success"
                  type="submit"
                  size="small"
                >
                  Save
                </Button>
              )}
            </Stack>
          </Stack>
        </div>
      </form>
    );
  else
    return (
      <>
        <ConfirmDelete
          handleCancel={handleCancelDelete}
          handleDelete={handleDelete}
        >
          <Alert severity="warning">
            Are you sure you want to delete the exercise <b>{current.name}</b>?
          </Alert>
        </ConfirmDelete>
      </>
    );
};
