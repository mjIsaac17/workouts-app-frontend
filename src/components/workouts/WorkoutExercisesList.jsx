import { Typography } from "@mui/material";
import React, { useEffect } from "react";
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
import { jsPDF } from "jspdf";

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

  const loadImage = (exercise) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = `../img/exercises/${exercise.imageName}`;
    });

  const handlePDF = () => {
    if (totalExercises > 0) {
      //Prepare images
      const maxHeight = 210,
        maxWidth = 190;

      const doc = new jsPDF("p", "mm", "a4");
      Promise.all(currentWorkoutExercises.map(loadImage)).then((images) => {
        images.forEach((image, i) => {
          const exercise = currentWorkoutExercises[i];
          doc.setFont("helvetica", "bold");
          doc.setFontSize(22);
          doc.text(exercise.name, 20, 20);
          doc.setFontSize(16);
          doc.setFont("helvetica", "normal");
          doc.text(exercise.description, 20, 40);
          let height = image.height,
            width = image.width;

          const ratio = height / width;

          if (height > maxHeight || width > maxWidth) {
            if (height > width) {
              height = maxHeight;
              width = height * (1 / ratio);
              //console.log("case 1", width, height, ratio);
              // Making reciprocal of ratio because ration of height as width is no valid here needs width as height
            } else if (width > height) {
              //console.log("case 2", width, height, ratio);

              width = maxWidth;
              height = width * ratio;
              // Ratio is valid here
            }
          }
          doc.addImage(
            image.src,
            exercise.imageName.split(".").at(-1),
            10,
            55,
            width,
            height
          );
          if (i < totalExercises - 1) doc.addPage("a4", "p");
        });
        doc.save(`${workoutName}.pdf`);
        // console.log(images);
      });
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" margin={3}>
        <b>{workoutName}</b> workout exercises
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
        <button type="button" onClick={handlePDF}>
          PDF
        </button>
      </div>
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
