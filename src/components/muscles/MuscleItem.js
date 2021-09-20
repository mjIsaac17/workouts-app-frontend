import React from "react";

export const MuscleItem = ({ muscle, image }) => {
  // import img from imagePath;
  console.log("url", process.env.PUBLIC_URL);
  //   const image = require("/img/back.jpg");
  return (
    <div className="card">
      <img src={`img/${image}`} alt={muscle} />
      <div className="card__title">
        <p>{muscle}</p>
      </div>
    </div>
  );
};
