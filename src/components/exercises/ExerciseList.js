import React, { useEffect, useState } from "react";
import { Add, Search } from "@mui/icons-material";
import {
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
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
import { setCurrentMuscle } from "../../actions/muscles.action";

import { Modal } from "../ui/Modal";
import { AddExerciseForm } from "./AddExerciseForm";
import { DetailsExercise } from "./DetailsExercise";
import { ExerciseItem } from "./ExerciseItem";
import { DetailsExerciseAdmin } from "./DetailsExerciseAdmin";
import WayToAddExercise from "./WayToAddExercise";
import AddExistingExercise from "./AddExistingExercise";
import { BtnExportToExcel } from "../data-export/BtnExportToExcel";
import { BtnExportExercisesToPDF } from "../data-export/BtnExportExercisesToPDF";
import { componentsModal } from "../../helpers/componentsModal";

export const ExerciseList = () => {
  // console.log("render <ExerciseList/>");
  const dispatch = useDispatch();

  // constants & variables
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));

  // selectors
  const modalState = useSelector((state) => state.modal);
  const { isAdmin } = useSelector((state) => state.auth.user);
  const currentMuscle = useSelector((state) => state.muscles.current);
  const { exerciseList, loading } = useSelector((state) => state.exercises);

  // states
  const [filterWord, setFilterWord] = useState("");
  const [totalExercises, setTotalExercises] = useState(exerciseList.length);

  // functions
  const handleSelect = (e) => {
    const selectedMuscleId = e.target.value;
    dispatch(
      setCurrentMuscle(
        selectedMuscleId !== 0
          ? muscleList.find((muscle) => muscle.id === selectedMuscleId)
          : null
      )
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
    if (search !== "") setTotalExercises(countElements(search));
    else setTotalExercises(exerciseList.length);
  };

  const handleAddClick = () => {
    if (currentMuscle.id !== 0)
      handleModal(
        true,
        "Add new or existing exercise",
        componentsModal.exerciseNew
      );
    else handleModal(true, "Add new exercise", componentsModal.exerciseList);
  };

  const countElements = (filterWord = "") => {
    let total = 0;
    exerciseList.map(
      (exercise) =>
        exercise.name.search(new RegExp(filterWord, "i")) !== -1 && total++
    );
    return total;
  };

  // variables
  const currentMuscleName = currentMuscle.name;

  // effects
  useEffect(() => {
    // console.log("effect startGettingExercises");
    dispatch(startGettingExercises(currentMuscle.id));
  }, [dispatch, currentMuscle.id]);

  useEffect(() => {
    setTotalExercises(exerciseList.length);
  }, [exerciseList, setTotalExercises]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex-box space-between m-y--1 space-elements-y--1">
            <FormControl>
              <InputLabel id="lblSelectMuscle">Muscle</InputLabel>
              <Select
                id="ddlMuscle"
                value={currentMuscle.id}
                label="Muscle"
                labelId="lblSelectMuscle"
                onChange={handleSelect}
                size="small"
              >
                <MenuItem value={0} name="All">
                  All
                </MenuItem>
                {muscleList.map((muscle, index) => (
                  <MenuItem key={index} value={muscle.id}>
                    {muscle.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                onClick={handleAddClick}
              >
                <Add />
              </Fab>
            </Tooltip>
          )}

          {modalState.componentName === componentsModal.exerciseList && (
            <Modal>
              <AddExerciseForm
                muscleList={muscleList}
                selectedMuscleName={currentMuscleName}
                handleModal={handleModal}
              />
            </Modal>
          )}

          {modalState.componentName === componentsModal.exerciseAddExisting && (
            <Modal modalSize="md2">
              <AddExistingExercise />
            </Modal>
          )}
          {modalState.componentName === componentsModal.exerciseItem && (
            <Modal modalSize="md">
              {isAdmin ? (
                <DetailsExerciseAdmin exerciseList={exerciseList} />
              ) : (
                <DetailsExercise exerciseList={exerciseList} />
              )}
            </Modal>
          )}
          {modalState.componentName === componentsModal.exerciseNew && (
            <Modal modalSize="sm">
              <WayToAddExercise />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
