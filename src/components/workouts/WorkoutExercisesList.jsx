import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setCurrentExercise } from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";
import { startGettingWorkoutExercises } from "../../actions/workout.action";
import { componentsModal } from "../../helpers/componentsModal";
import { BtnExportToExcel } from "../data-export/BtnExportToExcel";
import { DetailsExercise } from "../exercises/DetailsExercise";
import { Modal } from "../ui/Modal";
import { ExerciseCard } from "./ExerciseCard";
import { BtnExportExercisesToPDF } from "../data-export/BtnExportExercisesToPDF";

export const WorkoutExercisesList = () => {
  const dispatch = useDispatch();
  const { workoutName } = useParams();
  const { currentWorkoutExercises } = useSelector((state) => state.workouts);
  const totalExercises = currentWorkoutExercises.length;
  const modalState = useSelector((state) => state.modal);

  useEffect(() => {
    if (currentWorkoutExercises.length === 0) {
      // console.log("effect startGettingWorkoutExercises");
      dispatch(startGettingWorkoutExercises(workoutName));
    }
  }, [dispatch, workoutName, currentWorkoutExercises]);

  const handleSelectExercise = (exercise) => {
    dispatch(setCurrentExercise(exercise));
    dispatch(setModal(true, exercise.name, componentsModal.workoutsExercise));
  };

  return (
    <>
      <Typography variant="h4" component="p" textAlign="center" margin={3}>
        <b>{workoutName}</b> workout
      </Typography>
      <Typography variant="h5" component="p" textAlign="right">
        {totalExercises} Exercise(s)
      </Typography>
      <div className="export-data-buttons-area">
        <BtnExportToExcel
          dataSource="exercises"
          data={currentWorkoutExercises}
          fileName={`${workoutName} workout`}
          sheetName={workoutName}
        />
        <BtnExportExercisesToPDF
          exercises={currentWorkoutExercises}
          totalExercises={totalExercises}
          fileName={workoutName}
        />
      </div>
      <div className="card-grid-container">
        {currentWorkoutExercises.map((exercise, index) => (
          <ExerciseCard
            exercise={exercise}
            key={`${index}-${exercise.name}`}
            onCardClick={handleSelectExercise}
          />
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
