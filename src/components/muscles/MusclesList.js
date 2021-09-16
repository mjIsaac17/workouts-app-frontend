import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMuscles } from "../../actions/muscles";

export const MusclesList = () => {
  const dispatch = useDispatch();
  console.log("render musclesList");

  useEffect(() => {
    console.log("effect startgettingMuscles");
    dispatch(startGettingMuscles());
  }, [dispatch]);

  const { muscles, loading } = useSelector((state) => state.muscles);
  console.log(muscles);

  return <div>{loading ? <h1>Loading...</h1> : <h1>Muscles</h1>}</div>;
};
