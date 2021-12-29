import React from "react";
import { Link } from "react-router-dom";

export const MuscleItem = ({ muscle, editMode = false }) => {
  return (
    <div className="card card--md">
      {!editMode ? (
        <Link to={"/exercises"}>
          <img src={muscle.imageUrl} alt={muscle.imageName} />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </Link>
      ) : (
        <>
          <img src={muscle.imageUrl} alt={muscle.imageName} />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </>
      )}
    </div>
  );
};
