import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Stack,
  Button,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { VerticalTabs } from "../ui/VerticalTabs";
import { DataTableSelect } from "../ui/DataTableSelect";
import { Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { ChipsArray } from "../ui/ChipArray";
import { setSnackbar } from "../../actions/snackbar.action";
import {
  setCurrentWorkout,
  startAddingWorkout,
  startUpdatingWorkout,
} from "../../actions/workout.action";
import { useForm } from "../../hooks/useForm";

export const WorkoutAdd = ({ action }) => {
  const dispatch = useDispatch();
  //const { workoutExercises } = useSelector((state) => state.workouts);
  const { current: currentWorkout } = useSelector((state) => state.workouts);
  const [newImageName, setNewImageName] = useState("");

  const [formValues, handleInputChange, , setForm] = useForm({
    name: "",
    description: "",
  });
  const { name, description } = formValues;

  const muscleList = useMemo(
    () => JSON.parse(localStorage.getItem("muscleList")),
    []
  );
  //console.log("Current", currentWorkout);
  const [chips, setChips] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (action === "update") {
      if (currentWorkout.name) {
        setNewImageName(
          currentWorkout.imageName
            ? currentWorkout.imageName
            : "No image selected"
        );
        setForm({
          name: currentWorkout.name,
          description: currentWorkout.description,
        });
      }
      setChips(
        currentWorkout.workoutExercises.map((e, index) => ({
          id: e.id,
          label: e.name,
          key: index,
        }))
      );
    }
  }, [dispatch, currentWorkout, action]);

  const handleAddChip = (e) => {
    setChips([
      ...chips,
      { key: Date.now(), label: e.row.exerciseName, id: e.id },
    ]);
  };

  const handleRemoveChip = (chipToDelete) => {
    setChips(chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  console.log("render <WorkoutsAdd />");

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
      const previousIds = currentWorkout.workoutExercises
        .map((e) => e.id)
        .join(",");
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

    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(setModal(false));
    dispatch(setCurrentWorkout({ workoutExercises: [] }));
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
        <Button variant="contained" color="info" onClick={handleCloseModal}>
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
