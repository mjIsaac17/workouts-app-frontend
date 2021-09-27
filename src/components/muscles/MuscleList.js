import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMuscles } from "../../actions/muscles.action";
import { MuscleItem } from "./MuscleItem";

export const MusclesList = () => {
  const dispatch = useDispatch();
  const { muscleList, loading } = useSelector((state) => state.muscles);

  console.log("render musclesList");

  useEffect(() => {
    dispatch(startGettingMuscles());
    console.log("effect startgettingMuscles");
  }, [dispatch]);

  useEffect(() => {
    console.log("effect saveMuscleList");
    if (muscleList.length > 0)
      localStorage.setItem("muscleList", JSON.stringify(muscleList));
  }, [muscleList]);

  return (
    <div className="card__list">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        muscleList.map((muscle) => (
          <MuscleItem key={muscle.id} muscle={muscle} />
        ))
      )}
    </div>
  );
};
