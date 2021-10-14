import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Stack,
  Button,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { VerticalTabs } from "../ui/VerticalTabs";
import { DataTableSelect } from "../ui/DataTableSelect";
import { Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { ChipsArray } from "../ui/ChipArray";
import { setSnackbar } from "../../actions/snackbar.action";
import {
  startAddingWorkout,
  startUpdatingWorkout,
} from "../../actions/workout.action";
import { useForm } from "../../hooks/useForm";

export const WorkoutAdd = ({ action }) => {
  console.log("render <WorkoutsAdd />");

  const dispatch = useDispatch();
  const { currentWorkout, currentWorkoutExercises } = useSelector(
    (state) => state.workouts
  );

  const [newImageName, setNewImageName] = useState(
    currentWorkout.imageName ? currentWorkout.imageName : "No image selected"
  );

  const muscleList = useMemo(
    () => JSON.parse(localStorage.getItem("muscleList")),
    []
  );
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

  const [formValues, handleInputChange] = useForm({
    name: currentWorkout.name,
    description: currentWorkout.description,
  });
  const { name, description } = formValues;

  const handleAddChip = (e) => {
    setChips([
      ...chips,
      { key: Date.now(), label: e.row.exerciseName, id: e.id },
    ]);
  };

  const handleRemoveChip = (chipToDelete) => {
    setChips(chips.filter((chip) => chip.key !== chipToDelete.key));
  };

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
      //Check if the workout exercises were updated
      const previousIds = currentWorkoutExercises.map((e) => e.id).join(",");
      if (previousIds === exerciseIds) exerciseIds = null;

      dispatch(
        startUpdatingWorkout({
          id: currentWorkout.id,
          name: workoutName,
          description: workoutDescription,
          exerciseIds,
          image,
          imageName: currentWorkout.imageName,
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

      <label htmlFor="workoutImage">
        <Stack direction="row" alignItems="center">
          <input
            id="workoutImage"
            name="workoutImage"
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
          endIcon={<Save />}
          color="success"
          type="submit"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
