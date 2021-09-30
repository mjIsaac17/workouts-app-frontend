import React from "react";
import { Link } from "react-router-dom";

export const MuscleItem = ({ muscle }) => {
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
