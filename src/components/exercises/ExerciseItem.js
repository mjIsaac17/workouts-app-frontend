import React from "react";

export const ExerciseItem = ({ exercise }) => {
  return (
    <>
      <div className="card card--sm">
        <img src={`${exercise.imageUrl}`} alt={exercise.imageName} />
        <div className="card__title">
          <p>{exercise.name}</p>
        </div>
      </div>
    </>
  );
};
