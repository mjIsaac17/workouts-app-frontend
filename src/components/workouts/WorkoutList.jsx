import { Alert, Stack, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import {
  setCurrentWorkout,
  setLoading,
  startDeletingWorkout,
  startGettingMyWorkouts,
  startGettingWorkoutExercises,
} from "../../actions/workout.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { WorkoutAdd } from "./WorkoutAdd";
import { WorkoutCard } from "./WorkoutCard";

export const WorkoutList = () => {
  console.log("render <WorkoutList/>");
  const dispatch = useDispatch();
  const { myWorkouts, loading, currentWorkout } = useSelector(
    (state) => state.workouts
  );
  const { componentName } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(startGettingMyWorkouts());
  }, [dispatch]);

  const handleSelectWorkout = async (workout) => {
    dispatch(setLoading(true));
    dispatch(setCurrentWorkout(workout));
    await dispatch(startGettingWorkoutExercises(workout.name));
    dispatch(setLoading(false));
  };

  return (
    <div className="card__list">
      {myWorkouts.map((workout) => (
        <div key={workout.id} onClick={() => handleSelectWorkout(workout)}>
          <WorkoutCard key={workout.id} workout={workout} />
        </div>
      ))}
      {componentName === componentsModal.workoutsAdd && (
        <Modal>
          <WorkoutAdd action={"add"} />
        </Modal>
      )}
      {componentName === componentsModal.workoutsUpdate && (
        <Modal>
          {loading ? (
            <p>Loading workout data...</p>
          ) : (
            <WorkoutAdd action={"update"} />
          )}
        </Modal>
      )}
      {componentName === componentsModal.workoutsDelete && (
        <Modal>
          <Alert severity="warning">
            Are you sure you want to delete your workout{" "}
            <b>{currentWorkout.name}</b>?
          </Alert>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            marginTop="1rem"
          >
            <Button
              variant="contained"
              color="info"
              onClick={() => dispatch(setModal(false))}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() =>
                dispatch(
                  startDeletingWorkout({
                    id: currentWorkout.id,
                    imageName: currentWorkout.imageName,
                  })
                )
              }
            >
              Accept
            </Button>
          </Stack>
        </Modal>
      )}
    </div>
  );
};
