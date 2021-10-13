import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { setCurrentWorkout } from "../../actions/workout.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { WorkoutAdd } from "./WorkoutAdd";
import { WorkoutList } from "./WorkoutList";

export const WorkoutsScreen = () => {
  const dispatch = useDispatch();
  const { componentName } = useSelector((state) => state.modal);

  const handleAdd = () => {
    dispatch(setCurrentWorkout({ workoutExercises: [] }));

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

      {componentName === componentsModal.workoutsAdd && (
        <Modal>
          <WorkoutAdd action={"add"} />
        </Modal>
      )}
    </>
  );
};
