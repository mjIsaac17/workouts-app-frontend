import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentMuscle } from "../../actions/muscles.action";
// import { useHistory } from "react-router-dom";

export const MuscleItem = ({ muscle }) => {
  // const history = useHistory();
  const dispatch = useDispatch();

  const handleClickMuscle = () => {
    dispatch(setCurrentMuscle(muscle));
    localStorage.setItem(
      "currentMuscle",
      JSON.stringify({ id: muscle.id, name: muscle.name })
    );
    // history.push("/exercise");
  };
  return (
    <div className="card">
      <Link to={`/exercises/${muscle.id}`}>
        <img src={`img/${muscle.image}`} alt={muscle.name} />
        <div className="card__title">
          <p>{muscle.name}</p>
        </div>
      </Link>
    </div>
  );
};
