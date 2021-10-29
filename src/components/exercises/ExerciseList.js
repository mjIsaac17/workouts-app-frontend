import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";
import { Add, FileDownload, Search } from "@mui/icons-material";
import {
  Fab,
  IconButton,
  MenuItem,
  Select,
  Stack,
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

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
  console.log(currentMuscle, exerciseList);
  const exerciseDataSet = [
    {
      columns: [
        {
          title: "Exercise",
          width: { wpx: 200 },
          style: {
            font: { sz: "18", bold: true },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
        {
          title: "Muscle",
          width: { wpx: 200 },
          style: {
            font: { sz: "18", bold: true },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
        {
          title: "Description",
          width: { wpx: 300 },
          style: {
            font: { sz: "18", bold: true },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
      ],
      data: exerciseList.map((exercise) => [
        {
          value: exercise.name,
          style: {
            font: { sz: "14" },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
        {
          value: exercise.muscleName ? exercise.muscleName : currentMuscleName,
          style: {
            font: { sz: "14" },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
        {
          value: exercise.description,
          style: {
            font: { sz: "14" },
            alignment: {
              wrapText: true,
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
      ]),
    },
  ];

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

  //TODO: export data to excel.
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
          <Stack>
            <ExcelFile
              element={
                <Tooltip title="Export to Excel">
                  <IconButton aria-label="export to excel" color="success">
                    <FileDownload />
                  </IconButton>
                </Tooltip>
              }
              filename={`${currentMuscleName} exercises`}
            >
              <ExcelSheet
                dataSet={exerciseDataSet}
                name={`${currentMuscleName} exercises`}
              />
            </ExcelFile>
          </Stack>
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
