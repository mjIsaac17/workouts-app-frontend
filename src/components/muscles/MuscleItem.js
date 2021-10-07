import React from "react";
import { Link } from "react-router-dom";

export const MuscleItem = ({ muscle, editMode = false }) => {
  return (
    <div className="card">
      {!editMode ? (
        <Link to={`/exercises/${muscle.id}`}>
          <img src={`img/muscles/${muscle.imageName}`} alt={muscle.name} />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </Link>
      ) : (
        <>
          <img src={`img/muscles/${muscle.imageName}`} alt={muscle.name} />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </>
      )}
    </div>
  );
};
