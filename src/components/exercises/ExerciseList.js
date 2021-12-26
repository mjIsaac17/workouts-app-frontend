import React, { useEffect, useState } from "react";

import { Add, Search } from "@mui/icons-material";
import {
  Fab,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
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
import { DetailsExerciseAdmin } from "./DetailsExerciseAdmin";

export const ExerciseList = () => {
  // console.log("render <ExerciseList/>");
  const dispatch = useDispatch();

  // selectors
  const modalState = useSelector((state) => state.modal);
  const { isAdmin } = useSelector((state) => state.auth.user);
  const currentMuscle = useSelector((state) => state.muscles.current);
  const { exerciseList, loading } = useSelector((state) => state.exercises);
  const [currentMuscleName, setCurrentMuscleName] = useState(
    currentMuscle ? currentMuscle.name : "All"
  );

  // states
  const [muscleId, setMuscleId] = useState(
    currentMuscle ? currentMuscle.id : 0
  ); // 0 id when all exercises are selected
  const [filterWord, setFilterWord] = useState("");

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

  const handleSearch = (e) => {
    // Avoid getting error with RegEx because of the '\' escape character
    const search = e.target.value.replace(/\\/g, "\\\\");
    setFilterWord(search);
  };

  // effects
  useEffect(() => {
    // console.log("effect startGettingExercises");
    dispatch(startGettingExercises(muscleId));
  }, [dispatch, muscleId]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex-box space-between m--1">
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
            <TextField
              size="small"
              label="Search"
              onChange={handleSearch}
              placeholder="Filter exercises"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
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
            {exerciseList.map(
              (exercise) =>
                exercise.name.search(new RegExp(filterWord, "i")) !== -1 && (
                  <div
                    key={exercise.name + exercise.id}
                    onClick={() => handleClick(exercise)}
                  >
                    <ExerciseItem exercise={exercise} />
                  </div>
                )
            )}
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
              {isAdmin ? (
                <DetailsExerciseAdmin
                  muscleId={muscleId}
                  componentModalName={componentsModal.exerciseItem}
                />
              ) : (
                <DetailsExercise />
              )}
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
