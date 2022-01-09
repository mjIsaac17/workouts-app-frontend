import React, { useCallback, useMemo, useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Stack,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch, useSelector } from "react-redux";
import { Save } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { VerticalTabs } from "../ui/VerticalTabs";
import { DataTableSelect } from "../ui/DataTableSelect";
import { ChipsArray } from "../ui/ChipArray";
import { InputFile } from "../ui/InputFile";
import { setModal } from "../../actions/modal.action";
import { setSnackbar } from "../../actions/snackbar.action";
import {
  startAddingWorkout,
  startUpdatingWorkout,
} from "../../actions/workout.action";

export const WorkoutAdd = ({ action }) => {
  // console.log("render <WorkoutsAdd />");

  const dispatch = useDispatch();

  // selectors
  const { currentWorkout, currentWorkoutExercises } = useSelector(
    (state) => state.workouts
  );

  // states
  const [chips, setChips] = useState(
    currentWorkoutExercises
      ? currentWorkoutExercises.map((e, index) => ({
          id: e.id,
          label: e.name,
          key: index,
        }))
      : []
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // custom hooks
  const [formValues, handleInputChange] = useForm({
    name: currentWorkout.name || "",
    description: currentWorkout.description || "",
  });

  // constants & variables
  const { name, description } = formValues;
  const muscleList = useMemo(
    () => JSON.parse(localStorage.getItem("muscleList")),
    []
  );

  // functions
  const handleAddChip = useCallback(
    (e) => {
      setChips([
        ...chips,
        { key: Date.now(), label: e.row.exerciseName, id: e.id },
      ]);
    },
    [chips]
  );

  const handleRemoveChip = useCallback(
    (chipToDelete) =>
      setChips(chips.filter((chip) => chip.key !== chipToDelete.key)),
    [chips]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate data
    const workoutName = name.trim();
    const workoutDescription = description.trim();
    const image = document.getElementById("workoutImage").files[0];

    if (!workoutName) {
      setError("Invalid workout name");
      return;
    } else setError("");

    if (chips.length === 0) {
      dispatch(setSnackbar("error", "Select at least one exercise", true));
      return;
    }
    let exerciseIds = chips.map((chip) => chip.id).join(",");
    setLoading(true);
    if (action === "add")
      dispatch(
        startAddingWorkout({
          name: workoutName,
          description: workoutDescription,
          exerciseIds,
          image,
        })
      );
    else if (action === "update") {
      //Check if the workout exercises were updated to avoid deleting and saving them in the db
      const previousIds = currentWorkoutExercises.map((e) => e.id).join(",");
      if (previousIds === exerciseIds) exerciseIds = null;

      dispatch(
        startUpdatingWorkout({
          id: currentWorkout.id,
          name: workoutName,
          description: workoutDescription,
          imageName: currentWorkout.imageName,
          imageUrl: currentWorkout.imageUrl,
          exerciseIds,
          newImage: image,
        })
      );
    }
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <FormControl sx={{ width: "100%" }} error={!!error}>
        <InputLabel htmlFor="workoutName">Workout name*</InputLabel>
        <Input
          required
          id="workoutName"
          aria-describedby="workout-name"
          name="name"
          onChange={handleInputChange}
          value={name}
        />
        <FormHelperText id="my-helper-text">
          {!error ? "Enter a name that describe your workout" : error}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="workoutDescription">Description</InputLabel>
        <Input
          id="workoutDescription"
          aria-describedby="workout-description"
          multiline
          name="description"
          value={description}
          onChange={handleInputChange}
          rows={2}
        />
      </FormControl>
      <div>
        <VerticalTabs muscleList={muscleList} />
        <ChipsArray chips={chips} handleDelete={handleRemoveChip} />
        <DataTableSelect handleAdd={handleAddChip} />
      </div>

      <div className="margin-y-1">
        <InputFile
          id="workoutImage"
          name="workoutImage"
          currentImageName={currentWorkout.imageName}
        />
      </div>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
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
          endIcon={<Save />}
          color="success"
          type="submit"
        >
          Save
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
