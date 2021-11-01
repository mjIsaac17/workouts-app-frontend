import React, { useEffect, useState } from "react";

import { Add, Search } from "@mui/icons-material";
import { Fab, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  startGettingExercises,
  setCurrentExercise,
} from "../../actions/exercise.action";
import { setModal } from "../../actions/modal.action";
import { componentsModal } from "../../helpers/componentsModal";
import { Modal } from "../ui/Modal";
import { AddExerciseForm } from "./AddExerciseForm";
import { DetailsExercise } from "./DetailsExercise";
import { ExerciseItem } from "./ExerciseItem";
import { BtnExportToExcel } from "../data-export/BtnExportToExcel";
import { BtnExportExercisesToPDF } from "../data-export/BtnExportExercisesToPDF";

export const ExerciseList = () => {
  console.log("render <ExerciseList/>");
  const dispatch = useDispatch();

  // selectors
  const modalState = useSelector((state) => state.modal);
  const { isAdmin } = useSelector((state) => state.user.user);
  const currentMuscle = useSelector((state) => state.muscles.current);
  const { exerciseList, loading } = useSelector((state) => state.exercises);
  const [currentMuscleName, setCurrentMuscleName] = useState(
    currentMuscle ? currentMuscle.name : "All"
  );

  // states
  const [muscleId, setMuscleId] = useState(
    currentMuscle ? currentMuscle.id : 0
  ); // 0 id when all exercises are selected

  // constants & variables
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));
  const totalExercises = exerciseList.length;

  // functions
  const handleSelect = (e) => {
    const id = e.target.value;
    setMuscleId(id);
    setCurrentMuscleName(
      id === 0 ? "All" : muscleList.find((m) => m.id === id).name
    );
  };

  const handleModal = (isOpen, title, componentName) => {
    dispatch(setModal(isOpen, title, componentName));
  };

  const handleClick = (exercise) => {
    dispatch(setCurrentExercise(exercise));
    dispatch(setModal(true, exercise.name, componentsModal.exerciseItem));
  };

  // effects
  useEffect(() => {
    console.log("effect startGettingExercises");
    dispatch(startGettingExercises(muscleId));
  }, [dispatch, muscleId]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex-box space-between sticky">
            <Select
              id="ddlMuscle"
              value={muscleId}
              label="Muscle"
              onChange={handleSelect}
              size="small"
            >
              <MenuItem value={0} name="All">
                All
              </MenuItem>
              {muscleList.map((muscle) => (
                <MenuItem key={`ddlMuscle-${muscle.id}`} value={muscle.id}>
                  {muscle.name}
                </MenuItem>
              ))}
            </Select>
            <div className="inputIcon">
              <input type="text" placeholder="Search" />
              <Search />
            </div>
          </div>
          <div className="flex-box space-between">
            <Typography variant="h5" component="p">
              Results:
            </Typography>
            <Typography variant="h5" component="p">
              {totalExercises > 0 ? totalExercises : 0} Exercise(s) found
            </Typography>
          </div>
          <div className="export-data-buttons-area">
            <BtnExportToExcel
              dataSource="exercises"
              data={exerciseList}
              fileName={`${currentMuscleName} exercises`}
              sheetName={`${currentMuscleName} exercises`}
            />
            <BtnExportExercisesToPDF
              exercises={exerciseList}
              totalExercises={totalExercises}
              fileName={`${currentMuscleName} exercises`}
            />
          </div>
          <div className="card-grid-container">
            {exerciseList.map((exercise) => (
              <div
                key={exercise.name + exercise.id}
                onClick={() => handleClick(exercise)}
              >
                <ExerciseItem exercise={exercise} />
              </div>
            ))}
          </div>
          {isAdmin && (
            <Tooltip title="Add new exercise">
              <Fab
                sx={{
                  position: "fixed",
                  bottom: (theme) => theme.spacing(2),
                  right: (theme) => theme.spacing(2),
                }}
                color="primary"
                aria-label="add-exercise"
                onClick={() =>
                  handleModal(
                    true,
                    "Add new exercise",
                    componentsModal.exerciseList
                  )
                }
              >
                <Add />
              </Fab>
            </Tooltip>
          )}

          {modalState.componentName === componentsModal.exerciseList && (
            <Modal>
              <AddExerciseForm
                muscleList={muscleList}
                muscleId={muscleId}
                handleModal={handleModal}
              />
            </Modal>
          )}
          {modalState.componentName === componentsModal.exerciseItem && (
            <Modal modalSize="md">
              <DetailsExercise
                muscleId={muscleId}
                exerciseList={exerciseList}
                componentModalName={componentsModal.exerciseItem}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
