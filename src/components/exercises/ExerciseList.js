import { Add, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { startGettingExercises } from "../../actions/exercise.action";
import { Modal } from "../ui/Modal";
import { AddExerciseForm } from "./AddExerciseForm";
import { ExerciseItem } from "./ExerciseItem";

export const ExerciseList = () => {
  const { muscleId } = useParams();
  const dispatch = useDispatch();
  console.log("render <ExerciseList/>");

  const { exerciseList, loading } = useSelector((state) => state.exercises);
  // const { muscleList } = useSelector((state) => state.muscles);
  const muscleList = JSON.parse(localStorage.getItem("muscleList"));

  const totalExercises = exerciseList.length;

  const handleSelect = () => {
    const id = document.getElementById("ddlMuscle").value;
    dispatch(startGettingExercises(id));
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
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
              <ExerciseItem
                key={exercise.name + exercise.id}
                exercise={exercise}
              />
            ))}
          </div>
          <button
            type="button"
            className="fab fab-primary"
            onClick={handleOpen}
          >
            <Add />
          </button>
          <Modal
            show={showModal}
            handleClose={handleClose}
            header="Add new exercise"
          >
            <AddExerciseForm
              muscleList={muscleList}
              handleClose={handleClose}
              defaultValue={muscleId}
            />
          </Modal>
        </>
      )}
    </div>
  );
};
