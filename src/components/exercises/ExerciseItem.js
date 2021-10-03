import React from "react";

export const ExerciseItem = ({ exercise }) => {
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
    </>
  );
};
