import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  startAddingExistingExercise,
  startGettingExercises,
} from "../../actions/exercise.action";
import { startGettingMuscles } from "../../actions/muscles.action";
import { DataTableSelect } from "../ui/DataTableSelect";
import Image from "../ui/Image";
import { VerticalTabs } from "../ui/VerticalTabs";

import { setModal } from "../../actions/modal.action";
import { setSnackbar } from "../../actions/snackbar.action";

const AddExistingExercise = () => {
  const dispatch = useDispatch();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const {
    muscleList,
    loading: muscleLoading,
    current: currentMuscle,
  } = useSelector((state) => state.muscles);

  // states
  const [saving, setSaving] = useState(false);

  // selectors
  const { exerciseListToAddNew, exerciseList } = useSelector(
    (state) => state.exercises
  );

  // handler functions
  const handleSelectExercise = (event) => {
    // Verify if the selected exercise already exists in the muscle exercises
    if (exerciseList.find((exercise) => exercise.id === event.row.id)) {
      dispatch(
        setSnackbar(
          "info",
          `The exercise ${event.row.name} already exists in ${currentMuscle.name} exericises`,
          true
        )
      );
    } else {
      setSelectedExercise(event.row);
    }
  };

  const handleMuscleChange = (muscleId) => {
    dispatch(startGettingExercises(muscleId, false));
  };

  const handleSave = () => {
    setSaving(true);
    dispatch(startAddingExistingExercise(selectedExercise, currentMuscle.id));
  };

  // effects
  useEffect(() => {
    if (muscleList.length === 0) dispatch(startGettingMuscles());
    dispatch(startGettingExercises(0, false));
  }, [dispatch, muscleList.length]);

  return (
    <div>
      {muscleLoading ? (
        <p>Loading muscles</p>
      ) : (
        <VerticalTabs
          muscleList={muscleList}
          handleChange={handleMuscleChange}
          removeCurrentMuscle={true}
        />
      )}

      <DataTableSelect
        handleAdd={handleSelectExercise}
        exerciseList={exerciseListToAddNew}
      />
      {!selectedExercise ? (
        <Typography component="p" variant="h6" textAlign="center" marginY={1}>
          No exercise selected
        </Typography>
      ) : (
        <>
          <Typography component="p" variant="h6" textAlign="center" marginY={1}>
            Selected exercise: {selectedExercise.name}
          </Typography>
          <div className="modal-new-exercise__image-section">
            <Image
              imageUrl={selectedExercise.imageUrl}
              defaultImageUrl={`${process.env.PUBLIC_URL}/img/default.jpg`}
              altText={selectedExercise.imageName}
              className="modal-image-30"
            />
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
              color="success"
              endIcon={<SaveIcon />}
              loading={saving}
              loadingPosition="end"
              onClick={handleSave}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>
        </>
      )}
    </div>
  );
};

export default AddExistingExercise;
