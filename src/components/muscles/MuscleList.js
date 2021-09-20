import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMuscles } from "../../actions/muscles.action";
import { MuscleItem } from "./MuscleItem";

export const MusclesList = () => {
  const dispatch = useDispatch();
  console.log("render musclesList");

  useEffect(() => {
    console.log("effect startgettingMuscles");
    dispatch(startGettingMuscles());
  }, [dispatch]);

  const { muscleList, loading } = useSelector((state) => state.muscles);
  // console.log(muscleList);

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
