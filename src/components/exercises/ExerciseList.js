import { Add, Search } from "@mui/icons-material";
import { Fab, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
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

export const ExerciseList = () => {
  const dispatch = useDispatch();
  const { urlMuscleId = "0" } = useParams();
  const modalState = useSelector((state) => state.modal);
  const [muscleId, setMuscleId] = useState(urlMuscleId);
  console.log("render <ExerciseList/>");

  const { exerciseList, loading } = useSelector((state) => state.exercises);
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));

  const totalExercises = exerciseList.length;

  const handleSelect = (e) => {
    const id = e.target.value;
    window.history.replaceState(null, "", `/exercises/${id}`);
    setMuscleId(id);
  };

  const handleModal = (isOpen, title, componentName) => {
    dispatch(setModal(isOpen, title, componentName));
  };

  const handleClick = (exercise) => {
    dispatch(setCurrentExercise(exercise));
    dispatch(setModal(true, exercise.name, componentsModal.exerciseItem));
  };

  useEffect(() => {
    console.log("effect startGettingExercises");
    if (muscleId) dispatch(startGettingExercises(muscleId));
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
              <MenuItem value="0">All</MenuItem>
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
              <DetailsExercise />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
