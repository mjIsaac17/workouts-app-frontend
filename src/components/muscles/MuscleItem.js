import React from "react";
import { Link } from "react-router-dom";
import Image from "../ui/Image";

export const MuscleItem = ({ muscle, editMode = false, onMuscleCardClick }) => {
  return (
    <div className="card card--md" onClick={() => onMuscleCardClick(muscle)}>
      {!editMode ? (
        <Link to={"/exercises"}>
          <Image
            imageUrl={muscle.imageUrl}
            defaultImageUrl={`${process.env.PUBLIC_URL}/img/default.jpg`}
            altText={muscle.imageName}
          />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </Link>
      ) : (
        <>
          <img
            src={
              muscle.imageUrl
                ? muscle.imageUrl
                : `${process.env.PUBLIC_URL}/img/default.jpg`
            }
            alt={muscle.imageName}
          />
          <div className="card__title">
            <p>{muscle.name}</p>
          </div>
        </>
      )}
    </div>
  );
};
