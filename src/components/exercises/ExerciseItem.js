import React from "react";
// import { useDispatch } from "react-redux";
// import { setCurrentMuscle } from "../../actions/muscles.action";

export const ExerciseItem = ({ exercise }) => {
  //   const dispatch = useDispatch();

  //   const handleClickMuscle = () => {
  //     dispatch(setCurrentMuscle(muscle));
  //     history.push("/exercise");
  //   };
  return (
    <div className="card">
      <img
        src={`../img/exercises/${exercise.image_name}`}
        alt={exercise.name}
      />
      <div className="card__title">
        <p>{exercise.name}</p>
      </div>
    </div>
  );
};
