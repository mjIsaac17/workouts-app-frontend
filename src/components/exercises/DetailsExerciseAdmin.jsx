import { useState } from "react";
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
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeletingExercise,
  startUpdatingExercise,
  setCurrentExercise,
} from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";
import { useForm } from "../../hooks/useForm";
import { ConfirmDelete } from "../ui/ConfirmDelete";
import { InputFile } from "../ui/InputFile";
import { setSnackbar } from "../../actions/snackbar.action";

export const DetailsExerciseAdmin = ({ muscleId = 0, exerciseList }) => {
  // console.log("render details", muscleId);
  const dispatch = useDispatch();

  // selectors
  const { current } = useSelector((state) => state.exercises);

  // states
  const [deleteMode, setDeleteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    exerciseList.findIndex((e) => e.id === current.id)
  );

  // custom hooks
  const [formValues, handleInputChange, setSpecificValue, setForm] = useForm({
    ...current, //Contains the data of the selected exercise
    muscleId: muscleId !== 0 ? muscleId : current.muscleId,
    newImage: null, //image file
  });

  // constants & variables
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));
  const inputImageName = "newImage";

  // functions
  const isFormValid = () => {
    if (!formValues.name) {
      dispatch(setSnackbar("error", "Invalid exercise name", true));
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      dispatch(startUpdatingExercise(formValues, muscleId));
    }
  };

  const setNewImage = () => {
    setSpecificValue(
      inputImageName,
      document.getElementById(inputImageName).files[0]
    );
  };

  const handleCancelDelete = () => {
    setDeleteMode(false);
  };
  const handleDelete = () => {
    dispatch(startDeletingExercise(formValues.id, formValues.imageUrl));
  };

  const handleSetNewExercise = (navigate = "next") => {
    let newExercise = {};
    if (navigate === "next") {
      if (exerciseList[currentIndex + 1]) {
        newExercise = exerciseList[currentIndex + 1];
        setCurrentIndex(currentIndex + 1);
      } else {
        newExercise = exerciseList[0];
        setCurrentIndex(0);
      }
    } else {
      if (exerciseList[currentIndex - 1]) {
        newExercise = exerciseList[currentIndex - 1];
        setCurrentIndex(currentIndex - 1);
      } else {
        newExercise = exerciseList[exerciseList.length - 1];
        setCurrentIndex(exerciseList.length - 1);
      }
    }
    dispatch(setCurrentExercise(newExercise));
    setForm({
      ...formValues,
      ...newExercise,
    });
  };

  const handleImageClick = () => {
    if (formValues.imageUrl) window.open(formValues.imageUrl, "_blank");
  };

  if (!deleteMode)
    return (
      <form onSubmit={handleSubmit} className="modal-details">
        <button
          type="button"
          className="btn__navigation btn__navigation--previous"
          onClick={() => handleSetNewExercise("previous")}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="btn__navigation btn__navigation--next"
          onClick={() => handleSetNewExercise("next")}
        >
          {">"}
        </button>
        <div className="modal-details__image-section">
          <img
            onClick={handleImageClick}
            className="image"
            src={
              formValues?.imageUrl
                ? formValues.imageUrl
                : `${process.env.PUBLIC_URL}/img/default.jpg`
            }
            alt={formValues.imageName}
          />
        </div>
        <div className="modal-details__form-section">
          <div>
            <TextField
              size="small"
              label="Exercise Name"
              fullWidth
              name="name"
              onChange={handleInputChange}
              value={formValues.name}
            />

            <TextField
              sx={{ margin: "1rem 0" }}
              size="small"
              name="description"
              fullWidth
              label="Description"
              multiline
              rows="3"
              onChange={handleInputChange}
              value={formValues.description}
            />
            <FormControl fullWidth>
              <InputLabel id="labelMuscleId">Muscle</InputLabel>
              <Select
                id="ddlMuscleAddExercise" //drop down list
                labelId="labelMuscleId"
                label="Muscle"
                size="small"
                value={formValues.muscleId}
                onChange={handleInputChange}
                name="muscleId"
              >
                {muscleList.map((muscle) => (
                  <MenuItem key={`ddlMuscles-${muscle.id}`} value={muscle.id}>
                    {muscle.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <InputFile
              name={inputImageName}
              id={inputImageName}
              onChangeFunction={setNewImage}
            />
          </div>

          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              endIcon={<Delete />}
              color="error"
              size="small"
              onClick={() => setDeleteMode(true)}
            >
              Delete
            </Button>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="info"
                onClick={() => dispatch(setModal(false, ""))}
                size="small"
              >
                Close
              </Button>

              <LoadingButton
                color="success"
                endIcon={<Save />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                type="submit"
                size="small"
              >
                Save
              </LoadingButton>
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
