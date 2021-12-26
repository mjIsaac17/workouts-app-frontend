import React from "react";
import { Fab, Tooltip, Typography } from "@mui/material";
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
  // console.log("render <WorkoutScreen/>");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(setCurrentWorkout({}));
    dispatch(successGetWorkoutExercises([]));
    dispatch(setModal(true, "Add new workout", componentsModal.workoutsAdd));
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" margin={3}>
        My workouts
      </Typography>

      <WorkoutList />

      <Tooltip title="Add new workout">
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
      </Tooltip>
    </>
  );
};
