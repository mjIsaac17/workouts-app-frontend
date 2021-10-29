import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setCurrentExercise } from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";
import { startGettingWorkoutExercises } from "../../actions/workout.action";
import { componentsModal } from "../../helpers/componentsModal";
import { DetailsExercise } from "../exercises/DetailsExercise";
import { Modal } from "../ui/Modal";
import { ExerciseCard } from "./ExerciseCard";

export const WorkoutExercisesList = () => {
  const dispatch = useDispatch();
  const { workoutName } = useParams();
  const { currentWorkoutExercises } = useSelector((state) => state.workouts);
  const totalExercises = currentWorkoutExercises.length;
  const modalState = useSelector((state) => state.modal);

  useEffect(() => {
    if (currentWorkoutExercises.length === 0) {
      console.log("effect startGettingWorkoutExercises");
      dispatch(startGettingWorkoutExercises(workoutName));
    }
  }, [dispatch, workoutName, currentWorkoutExercises]);

  const handleSelectExercise = (exercise) => {
    dispatch(setCurrentExercise(exercise));
    dispatch(setModal(true, exercise.name, componentsModal.workoutsExercise));
  };
  return (
    <>
      <Typography variant="h4" textAlign="center" margin={3}>
        <b>{workoutName}</b> workout exercises
      </Typography>
      <Typography variant="h5" component="p" textAlign="right">
        {totalExercises} Exercise(s)
      </Typography>

      <div className="card-flex-container">
        {currentWorkoutExercises.map((ex, index) => (
          <div
            key={`${index}-${ex.name}`}
            onClick={() => handleSelectExercise(ex)}
          >
            <ExerciseCard exercise={ex} />
          </div>
        ))}
      </div>
      {modalState.componentName === componentsModal.workoutsExercise && (
        <Modal modalSize="md">
          <DetailsExercise
            exerciseList={currentWorkoutExercises}
            componentModalName={componentsModal.workoutsExercise}
          />
        </Modal>
      )}
    </>
  );
};
