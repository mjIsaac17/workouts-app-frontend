import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentMuscle } from "../../actions/muscles.action";
import { useHistory } from "react-router-dom";

export const MuscleItem = ({ muscle }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickMuscle = () => {
    dispatch(setCurrentMuscle(muscle));
    history.push("/exercise");
  };
  return (
    <div className="card" onClick={handleClickMuscle}>
      <img src={`img/${muscle.image}`} alt={muscle.name} />
      <div className="card__title">
        <p>{muscle.name}</p>
      </div>
    </div>
  );
};
