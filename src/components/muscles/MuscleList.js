import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMuscles } from "../../actions/muscles.action";
import { AddExerciseForm } from "../exercises/AddExerciseForm";
import { Modal } from "../ui/Modal";
import { MuscleItem } from "./MuscleItem";

export const MusclesList = () => {
  const dispatch = useDispatch();
  const { muscleList, loading } = useSelector((state) => state.muscles);

  console.log("render musclesList");

  useEffect(() => {
    dispatch(startGettingMuscles());
    console.log("effect startgettingMuscles");
  }, [dispatch]);

  useEffect(() => {
    console.log("effect saveMuscleList");
    if (muscleList.length > 0)
      localStorage.setItem("muscleList", JSON.stringify(muscleList));
  }, [muscleList]);

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  if (loading) return <h1>Loading...</h1>;
  else
    return (
      <div>
        <div className="card__list">
          {muscleList.map((muscle) => (
            <MuscleItem key={muscle.id} muscle={muscle} />
          ))}
        </div>
        <button type="button" className="fab fab-primary" onClick={handleOpen}>
          <Add />
        </button>
        <Modal
          show={showModal}
          handleClose={handleClose}
          header="Add new exercise"
        >
          {/* <AddExerciseForm muscleList={muscleList} handleClose={handleClose} /> */}
        </Modal>
      </div>
    );
};
