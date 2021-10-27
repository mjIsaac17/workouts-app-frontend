import React from "react";

export const ExerciseItem = ({ exercise }) => {
  return (
    <>
      <div className="card card--sm">
        <img
          src={`../img/exercises/${exercise.imageName}`}
          alt={exercise.name}
        />
        <div className="card__title">
          <p>{exercise.name}</p>
        </div>
      </div>
    </>
  );
};
