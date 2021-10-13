import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setCurrentWorkout } from "../../actions/workout.action";
import { ExerciseCard } from "./ExerciseCard";

export const WorkoutExercisesList = () => {
  const dispatch = useDispatch();
  const { workoutName } = useParams();
  const { currentWorkoutExercises } = useSelector((state) => state.workouts);

  useEffect(() => {
    dispatch(setCurrentWorkout({ name: workoutName }));
  }, [dispatch, workoutName]);

  return (
    <div className="card__list">
      {currentWorkoutExercises.map((e, index) => (
        <ExerciseCard key={`${index}-${e.name}`} exercise={e} />
      ))}
    </div>
  );
};
