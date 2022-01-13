import React from "react";
import Image from "../ui/Image";

export const ExerciseItem = ({ exercise }) => {
  return (
    <>
      <div className="card card--sm">
        <Image
          imageUrl={exercise.imageUrl}
          defaultImageUrl={`${process.env.PUBLIC_URL}/img/default.jpg`}
          altText={exercise.imageName}
        />
        <div className="card__title">
          <p>{exercise.name}</p>
        </div>
      </div>
    </>
  );
};
