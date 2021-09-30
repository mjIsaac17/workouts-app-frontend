import React from "react";
import { Modal } from "../ui/Modal";
import { DetailsExercise } from "./DetailsExercise";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { useSelector } from "react-redux";
import { componentsModal } from "../../helpers/componentsModal";
// import { setCurrentMuscle } from "../../actions/muscles.action";

export const ExerciseItem = ({ exercise }) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  //   const handleClickMuscle = () => {
  //     dispatch(setCurrentMuscle(muscle));
  //     history.push("/exercise");
  //   };

  const handleClick = () => {
    console.log("current ", exercise.name);
    // dispatch(setModal(true, exercise.name, componentsModal.exerciseItem));
  };
  return (
    <>
      <div className="card">
        <img
          src={`../img/exercises/${exercise.image_name}`}
          alt={exercise.name}
        />
        <div className="card__title">
          <p>{exercise.name}</p>
        </div>
      </div>
      {/* {modalState.componentName === componentsModal.exerciseItem && (
        <Modal>
          <DetailsExercise exercise={exercise} />
        </Modal>
      )} */}
    </>
  );
};
