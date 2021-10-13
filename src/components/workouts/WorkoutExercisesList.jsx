import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { startSettingCurrentWorkout } from "../../actions/workout.action";
import { ExerciseCard } from "./ExerciseCard";

export const WorkoutExercisesList = () => {
  const { workoutName } = useParams();
  const dispatch = useDispatch();
  const { workoutExercises } = useSelector((state) => state.workouts.current);

  useEffect(() => {
    dispatch(startSettingCurrentWorkout({ name: workoutName }));
  }, [dispatch, workoutName]);

  return (
    <div className="card__list">
      {workoutExercises.map((e, index) => (
        <ExerciseCard key={`${index}-${e.name}`} exercise={e} />
      ))}
    </div>
  );
};
