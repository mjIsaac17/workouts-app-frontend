import React from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { WorkoutList } from "./WorkoutList";
import { setModal } from "../../actions/modal.action";
import {
  setCurrentWorkout,
  successGetWorkoutExercises,
} from "../../actions/workout.action";
import { componentsModal } from "../../helpers/componentsModal";

export const WorkoutsScreen = () => {
  console.log("render <WorkoutScreen/>");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(setCurrentWorkout({}));
    dispatch(successGetWorkoutExercises([]));
    dispatch(setModal(true, "Add new workout", componentsModal.workoutsAdd));
  };

  return (
    <>
      <h2>Workouts</h2>
      <WorkoutList />

      <Fab
        onClick={handleAdd}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        color="primary"
        aria-label="add-workout"
      >
        <Add />
      </Fab>
    </>
  );
};
