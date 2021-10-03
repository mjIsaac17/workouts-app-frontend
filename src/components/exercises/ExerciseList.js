import { Add, Search } from "@material-ui/icons";
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
  const { urlMuscleId } = useParams();
  const modalState = useSelector((state) => state.modal);
  // console.log(urlMuscleId);
  const [muscleId, setMuscleId] = useState(urlMuscleId);
  console.log("render <ExerciseList/>");

  const { exerciseList, loading } = useSelector((state) => state.exercises);
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));

  const totalExercises = exerciseList.length;

  const handleSelect = () => {
    const id = document.getElementById("ddlMuscle").value;
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
          <div className="searchArea">
            <select
              id="ddlMuscle" //drop down list
              defaultValue={muscleId}
              onChange={handleSelect}
            >
              <option value="0">All</option>
              {muscleList.map((muscle) => (
                <option key={`ddlMuscle-${muscle.id}`} value={muscle.id}>
                  {muscle.name}
                </option>
              ))}
            </select>
            <div className="inputIcon">
              <input type="text" placeholder="Search" />
              <Search></Search>
            </div>
          </div>
          <div className="searchArea resultsText">
            <p>Results:</p>
            <p>{totalExercises > 0 ? totalExercises : 0} Exercise(s) found</p>
          </div>
          <div className="card__list">
            {exerciseList.map((exercise) => (
              <div
                key={exercise.name + exercise.id}
                onClick={() => handleClick(exercise)}
              >
                <ExerciseItem exercise={exercise} />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="fab fab-primary"
            onClick={() =>
              handleModal(
                true,
                "Add new exercise",
                componentsModal.exerciseList
              )
            }
          >
            <Add />
          </button>
          {modalState.componentName === componentsModal.exerciseList && (
            <Modal>
              <AddExerciseForm
                muscleList={muscleList}
                defaultValue={muscleId}
                handleModal={handleModal}
              />
            </Modal>
          )}
          {modalState.componentName === componentsModal.exerciseItem && (
            <Modal>
              <DetailsExercise />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
